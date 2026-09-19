/**
 * O visor 360 da home: uma esfera equirretangular por sala, a câmera no
 * centro dela, e portas que se atravessa a pé.
 *
 * Portado do viewer do Visogram (`src/tour/viewer.ts` lá), que é a
 * implementação de referência e está muito melhor comentada do que isto
 * precisa ser. O que mudou é o fato de aqui ele viver DENTRO da página, e não
 * por cima dela:
 *
 * - O de lá é um overlay: sela a página com `inert`, empilha uma entrada no
 *   histórico, prende o Tab e fecha no Esc. Nada disso serve a uma seção.
 * - O de lá dá `preventDefault` na roda do mouse para dar zoom. Aqui isso
 *   sequestraria a rolagem da página no meio da home — a roda não é nossa. O
 *   zoom sobrou para a pinça e para as teclas + e -.
 * - O de lá tem uma tira de miniaturas para pular entre as 15 salas. Aqui só
 *   existem as 5 que se alcançam a pé, e a navegação é a porta.
 * - Aqui o laço PARA quando a seção sai da tela. Lá a pergunta não existia.
 *
 * Este módulo é o único do arquivo que importa three, e entra por import
 * dinâmico: nada disto viaja no bundle de quem só abre a home e não rola.
 */

import {
  LinearFilter,
  LinearMipmapLinearFilter,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  SRGBColorSpace,
  Texture,
  TextureLoader,
  Vector3,
  WebGLRenderer,
} from "three";

import type { CenaBiotique, PortaBiotique } from "@/data/biotique";

// ------------------------------------------------------------------ ajustes

/**
 * A convenção de projeção do Lesco Viewer, mapeada na esfera do three.
 *
 * O shader de lá centra `u = 0.5 - yaw/2pi`. A SphereGeometry do three,
 * espelhada para ser vista por dentro, centra `u = t/2pi - 0.25` com rotação
 * `t`. Igualando: `t = 1.5pi - yaw`. Com a câmera carregando o yaw, a esfera
 * fica parada em `1.5pi`. Errar esse negativo põe toda cena meia volta fora.
 * A dedução inteira está em `src/projection.ts` do Visogram.
 */
const ORIGEM_YAW = 1.5 * Math.PI;

/**
 * Quanto abrir num painel para o qual a cena não foi enquadrada. A câmera fixa
 * o ângulo VERTICAL, então a proporção decide quanto entra de lado: 82º num
 * painel 5/4 dão 95º de varredura, e os mesmos 82º num painel retrato de 4/5
 * dariam 70º — uma parede. Então o ângulo da cena vira PISO, e a câmera abre
 * até caber `VARREDURA` de lado, com teto onde a projeção começa a embarrigar.
 * Cópia de `src/framing.ts` do Visogram; ver lá o raciocínio completo.
 */
const VARREDURA = 88;
const FOV_TETO = 104;
const FOV_PISO = 32;

/** 85º. Passando disso os polos borram e o horizonte sai do quadro. */
const LIMITE_PITCH = 1.4835;
/** Cruzamento entre salas, em segundos. */
const FUSAO = 0.5;
/** Inércia: a velocidade cai a 1/e em 1/AMORTECE segundos. */
const AMORTECE = 5.5;
/** Abaixo disto o arrasto foi um toque no que estiver embaixo do ponteiro. */
const FOLGA_ARRASTO = 6;
/** A travessia inteira, em segundos, do meio de uma sala ao meio da outra. */
const TRAVESSIA = 1;
/** Quanto a travessia empurra as salas, nas 10 unidades da própria esfera. */
const EMPURRAO = 3.5;
/** Uma porta é caminhada no máximo a 20º do horizonte: mirada exatamente, uma
 *  marca baixa deixaria o visitante encarando o chão da sala seguinte. */
const INCLINACAO_CHEGADA = 0.35;
/** Setas, em radianos por toque; + e - mexem o fov por razão fixa. */
const PASSO_TECLA = 0.08;
const PASSO_ZOOM = 1.18;

/**
 * Quantos panoramas podem estar na GPU ao mesmo tempo. Um 4096x2048 é 32 MB
 * como RGBA e 43 MB com mipmap: o conjunto de trabalho é a sala na tela, a que
 * está entrando e a que uma travessia está esquentando. Os borrões embutidos
 * são algumas centenas de bytes, nunca entram nesta conta e por isso nunca
 * podem ser despejados debaixo de uma sala que ainda espera o panorama.
 */
const TETO_CACHE = 3;

const limita = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));
const suaviza = (t: number) => 0.5 - Math.cos(Math.PI * limita(t, 0, 1)) / 2;
const emGraus = (r: number) => (r * 180) / Math.PI;
const emRad = (d: number) => (d * Math.PI) / 180;

const verticalPara = (h: number, aspecto: number) =>
  2 * emGraus(Math.atan(Math.tan(emRad(h / 2)) / aspecto));

/** Abre, nunca fecha: cena enquadrada mais larga do que `VARREDURA` pede fica
 *  com o ângulo dela, que é toda cena num painel deitado. */
const fovDeAbertura = (fov: number, aspecto: number) =>
  Math.min(Math.max(fov, verticalPara(VARREDURA, aspecto)), FOV_TETO);

/** A direção do mundo para onde (yaw, pitch) aponta. */
const mira = (yaw: number, pitch: number) =>
  new Vector3(
    -Math.sin(yaw) * Math.cos(pitch),
    Math.sin(pitch),
    -Math.cos(yaw) * Math.cos(pitch),
  );

/** O mesmo ângulo, escrito perto de `de`: girar 350º é girar -10º. */
const anguloVizinho = (de: number, para: number) =>
  de + Math.atan2(Math.sin(para - de), Math.cos(para - de));

// -------------------------------------------------------------------- tipos

export interface EstadoVisor {
  /** Id da sala em que se está. */
  cena: string;
  nome: string;
  /** Há caminho andado para desfazer. */
  podeVoltar: boolean;
  /** Um panorama está em voo. */
  carregando: boolean;
  /** O WebGL não subiu, ou uma sala não baixou. */
  falhou: boolean;
}

interface Camada {
  malha: Mesh;
  material: MeshBasicMaterial;
  cena: CenaBiotique | null;
}

interface Marca {
  el: HTMLButtonElement;
  dir: Vector3;
}

interface Travessia {
  dir: Vector3;
  deYaw: number;
  paraYaw: number;
  dePitch: number;
  paraPitch: number;
  t: number;
  para: CenaBiotique;
  entregue: boolean;
}

/** Uma sala visitada, e a direção em que se saiu dela. */
interface Passo {
  cena: CenaBiotique;
  dir: Vector3;
}

export interface OpcoesVisor {
  tela: HTMLCanvasElement;
  palco: HTMLElement;
  /** Onde os botões de porta são desenhados; posicionados a cada quadro. */
  marcas: HTMLElement;
  cenas: CenaBiotique[];
  /** `nome` já traduzido -> o rótulo do botão de porta. */
  rotuloPorta: (nome: string) => string;
  aoMudar: (estado: EstadoVisor) => void;
}

export interface Visor {
  /** Liga e desliga o laço de quadros conforme a seção entra e sai da tela. */
  ativar(ligado: boolean): void;
  voltar(): void;
  destruir(): void;
}

// -------------------------------------------------------------------- visor

export function criarVisor(opcoes: OpcoesVisor): Visor {
  const { tela, palco, marcas, cenas, rotuloPorta, aoMudar } = opcoes;
  const porId = new Map(cenas.map((c) => [c.id, c]));

  let renderizador: WebGLRenderer | null = null;
  try {
    renderizador = new WebGLRenderer({ canvas: tela, antialias: false, alpha: true });
  } catch (erro) {
    console.warn("[biotique] visor 360 indisponível", erro);
  }

  const mundo = new Scene();
  const camera = new PerspectiveCamera(82, 1, 0.1, 100);
  camera.rotation.order = "YXZ";

  // Espelhada, para a sala ler do lado certo vista de dentro com renderização
  // de face frontal comum.
  const geometria = new SphereGeometry(10, 64, 40);
  geometria.scale(-1, 1, 1);

  const camadas: Camada[] = [0, 1].map((i) => {
    const material = new MeshBasicMaterial({
      transparent: true,
      opacity: i === 0 ? 1 : 0,
      depthTest: false,
      depthWrite: false,
    });
    const malha = new Mesh(geometria, material);
    // Quem carrega o rumo aqui é a câmera, então a esfera nunca gira.
    malha.rotation.y = ORIGEM_YAW;
    malha.frustumCulled = false;
    malha.renderOrder = i;
    mundo.add(malha);
    return { malha, material, cena: null };
  });

  const carregador = new TextureLoader();
  const menosMovimento = window.matchMedia("(prefers-reduced-motion: reduce)");

  // --------------------------------------------------------------- texturas

  /** Promessas, e não texturas: uma sala esquentada na aproximação da
   *  travessia e pedida de novo na chegada é um pedido, não dois. */
  const cache = new Map<string, Promise<Texture>>();
  /** Ordem de inserção não é ordem de uso; o despejo mede por esta. */
  const usadas: string[] = [];
  /** As que já chegaram — o despejo decide na hora, e `cache` tem promessas. */
  const vivas = new Map<string, Texture>();

  function tocar(url: string) {
    if (url.startsWith("data:")) return;
    const onde = usadas.indexOf(url);
    if (onde !== -1) usadas.splice(onde, 1);
    usadas.push(url);
    if (usadas.length <= TETO_CACHE) return;
    const naTela = new Set(camadas.map((c) => c.material.map).filter(Boolean) as Texture[]);
    for (const candidata of [...usadas]) {
      if (usadas.length <= TETO_CACHE) break;
      const textura = vivas.get(candidata);
      // Pular o que ainda está em voo e o que uma camada ainda desenha:
      // despejar isso deixaria a sala preta.
      if (!textura || naTela.has(textura)) continue;
      textura.dispose();
      vivas.delete(candidata);
      cache.delete(candidata);
      usadas.splice(usadas.indexOf(candidata), 1);
    }
  }

  function texturaDe(url: string) {
    tocar(url);
    const guardada = cache.get(url);
    if (guardada) return guardada;
    const emVoo = carregador.loadAsync(url).then((textura) => {
      textura.colorSpace = SRGBColorSpace;
      textura.magFilter = LinearFilter;
      textura.minFilter = LinearMipmapLinearFilter;
      textura.generateMipmaps = true;
      if (renderizador) {
        textura.anisotropy = Math.min(8, renderizador.capabilities.getMaxAnisotropy());
      }
      vivas.set(url, textura);
      // De novo na chegada: um download lento pode ter sido ultrapassado por
      // duas salas, e o teto é sobre o que está residente, não sobre o pedido.
      tocar(url);
      return textura;
    });
    emVoo.catch(() => {
      cache.delete(url);
      const onde = usadas.indexOf(url);
      if (onde !== -1) usadas.splice(onde, 1);
    });
    cache.set(url, emVoo);
    return emVoo;
  }

  // ---------------------------------------------------------------- estado

  let atual: CenaBiotique | null = null;
  let frente = 0;
  /** Progresso do cruzamento, ou null quando assentado. */
  let fundindo: number | null = null;
  let ativo = false;

  let yaw = 0;
  let pitch = 0;
  let fov = 82;
  /** Inércia, em radianos por segundo. */
  let velYaw = 0;
  let velPitch = 0;

  let travessia: Travessia | null = null;
  /** As salas por onde se passou, e por onde se saiu de cada uma. */
  const trilha: Passo[] = [];

  let marcadores: Marca[] = [];
  let quadro = 0;
  let ultimo = 0;
  let emVoo = 0;
  let falhou = false;
  let vivo = true;

  const dir = new Vector3();

  /** O ângulo em que uma cena abre neste painel. Só a ABERTURA: depois disso o
   *  fov é do visitante, e uma pinça nunca é desautorizada. */
  const abertura = (cena: CenaBiotique) =>
    fovDeAbertura(limita(cena.vista.fov, FOV_PISO, FOV_TETO), camera.aspect);

  function avisar() {
    if (!atual) return;
    aoMudar({
      cena: atual.id,
      nome: atual.nome,
      podeVoltar: trilha.length > 0,
      carregando: emVoo > 0,
      falhou,
    });
  }

  // --------------------------------------------------------------- desenho

  function redimensionar() {
    if (!renderizador) return;
    const l = palco.clientWidth;
    const a = palco.clientHeight;
    if (!l || !a) return;
    renderizador.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderizador.setSize(l, a, false);
    camera.aspect = l / a;
    camera.updateProjectionMatrix();
    pedirQuadro();
  }

  /**
   * Onde cada porta aparece no painel, e o que fazer com a que não cabe nele.
   *
   * O hall abre virado para a quina do ripado, e a porta da escada fica 134º
   * dali: a cada instante é normal que nenhuma porta esteja no quadro. Cortar
   * a marca na borda parece defeito, e simplesmente escondê-la deixaria a
   * caminhada por achar.
   *
   * Então a marca fora do quadro ENCOSTA NA BORDA, do lado para o qual se tem
   * de girar, e perde o rótulo — vira uma seta de "a saída é por ali".
   *
   * Não dá para usar `project()` para isso: atrás da câmera ela inverte o
   * sinal e a marca apontaria para o lado errado. Daí a conta à mão em espaço
   * de câmera, onde o que está à frente tem z negativo.
   */
  function posicionarMarcas() {
    if (!marcadores.length) return;
    const l = palco.clientWidth;
    const a = palco.clientHeight;
    /** Respiro da borda, para o anel não sair pela metade. */
    const beirada = 22;
    const tanV = Math.tan(emRad(camera.fov) / 2);
    const tanH = tanV * camera.aspect;

    for (const marca of marcadores) {
      dir.copy(marca.dir).applyMatrix4(camera.matrixWorldInverse);
      const naFrente = dir.z < -1e-6;
      let nx: number;
      let ny: number;
      if (naFrente) {
        nx = dir.x / -dir.z / tanH;
        ny = dir.y / -dir.z / tanV;
      } else {
        // Atrás: só a direção no plano da tela, jogada bem para fora, para o
        // recorte abaixo levá-la à borda certa.
        const k = Math.hypot(dir.x, dir.y) || 1;
        nx = (dir.x / k) * 99;
        ny = (dir.y / k) * 99;
      }

      const fora = !naFrente || Math.abs(nx) > 1 || Math.abs(ny) > 1;
      if (fora) {
        // Encolhe mantendo a direção: o maior componente vai parar em ±1.
        const maior = Math.max(Math.abs(nx), Math.abs(ny)) || 1;
        nx /= maior;
        ny /= maior;
      }

      const x = limita((nx * 0.5 + 0.5) * l, beirada, l - beirada);
      const y = limita((-ny * 0.5 + 0.5) * a, beirada, a - beirada);
      marca.el.hidden = false;
      marca.el.dataset.fora = fora ? "sim" : "nao";
      marca.el.style.transform =
        `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, -50%)`;
    }
  }

  /**
   * Onde ficam as duas salas enquanto se sai de uma e entra na outra.
   *
   * A câmera não se move: ela fica na origem, que é o único ponto em que uma
   * esfera equirretangular não distorce, e são as salas que deslizam por ela.
   * A que se deixa vai para trás; a que se entra começa `EMPURRAO` à frente e
   * chega ao repouso em torno da câmera exatamente quando o cruzamento acaba.
   * As duas andam no mesmo sentido e no mesmo passo, então a coisa toda é UM
   * movimento para a frente, sem nada de que voltar.
   */
  function posicionarSalas() {
    if (!travessia) {
      for (const camada of camadas) camada.malha.position.set(0, 0, 0);
      return;
    }
    const x = EMPURRAO * suaviza(travessia.t);
    const entrando = camadas[frente === 0 ? 1 : 0];
    const saindo = camadas[frente];
    saindo?.malha.position.copy(travessia.dir).multiplyScalar(-x);
    entrando?.malha.position.copy(travessia.dir).multiplyScalar(EMPURRAO - x);
  }

  function pintar() {
    if (!renderizador) return;
    camera.rotation.y = yaw;
    camera.rotation.x = pitch;
    camera.fov = fov;
    camera.updateProjectionMatrix();
    // Antes de posicionar as marcas, e não depois: quem atualiza a matriz de
    // mundo da câmera é o render, que só roda no fim desta função — sem isto
    // as portas ficariam um quadro atrás da imagem durante o arrasto.
    camera.updateMatrixWorld();
    posicionarSalas();
    // As portas pertencem à sala em que se está. No meio do passo elas
    // estariam deslizando por uma parede que se dissolve, então mergulham e
    // voltam para a sala em que se chegou.
    const apaga = travessia ? (1 - Math.sin(Math.PI * travessia.t)).toFixed(3) : "";
    if (marcas.style.opacity !== apaga) marcas.style.opacity = apaga;
    posicionarMarcas();
    renderizador.render(mundo, camera);
  }

  function pedirQuadro() {
    if (quadro || !ativo || !vivo) return;
    if (document.hidden) {
      // Alguns contextos dizem escondido e mostram a página — um painel de
      // preview, uma aba sendo capturada. Não recebem quadro nenhum, então
      // laço não é opção: assenta o que estiver em curso e desenha uma vez.
      assentarTravessia();
      assentarFusao();
      pintar();
      return;
    }
    quadro = requestAnimationFrame(passo);
  }

  function passo(agora: number) {
    quadro = 0;
    if (!renderizador) return;
    const dt = ultimo ? Math.min((agora - ultimo) / 1000, 0.1) : 1 / 60;
    ultimo = agora;

    let mexendo = false;

    if (velYaw || velPitch) {
      yaw += velYaw * dt;
      pitch = limita(pitch + velPitch * dt, -LIMITE_PITCH, LIMITE_PITCH);
      const queda = Math.exp(-AMORTECE * dt);
      velYaw *= queda;
      velPitch *= queda;
      if (Math.abs(velYaw) < 0.002 && Math.abs(velPitch) < 0.002) {
        velYaw = 0;
        velPitch = 0;
      } else {
        mexendo = true;
      }
    }

    if (travessia) {
      travessia.t = Math.min(1, travessia.t + dt / TRAVESSIA);
      const t = suaviza(travessia.t);
      yaw = travessia.deYaw + (travessia.paraYaw - travessia.deYaw) * t;
      pitch = travessia.dePitch + (travessia.paraPitch - travessia.dePitch) * t;
      // O cruzamento é o último FUSAO do movimento, para a sala resolver com a
      // câmera ainda entrando nela, e não depois de ela ter parado.
      if (!travessia.entregue && travessia.t >= 1 - FUSAO / TRAVESSIA) {
        travessia.entregue = true;
        irPara(travessia.para, true);
      }
      if (travessia.t < 1) mexendo = true;
    }

    if (fundindo !== null) {
      fundindo += dt / (menosMovimento.matches ? FUSAO * 0.4 : FUSAO);
      const t = suaviza(fundindo);
      const entrando = camadas[frente === 0 ? 1 : 0];
      const saindo = camadas[frente];
      if (entrando) entrando.material.opacity = t;
      if (saindo) saindo.material.opacity = 1 - t;
      if (fundindo >= 1) {
        if (saindo) {
          saindo.material.opacity = 0;
          saindo.cena = null;
          saindo.material.map = null;
          saindo.material.needsUpdate = true;
        }
        frente = frente === 0 ? 1 : 0;
        fundindo = null;
        // A travessia acaba aqui e não um quadro antes: `frente` acabou de
        // virar, e posicionarSalas() lê isso.
        travessia = null;
      } else {
        mexendo = true;
      }
    }

    pintar();
    // Nada nesta tela se move sozinho: uma vista assentada desenha uma vez e
    // para, que é a diferença entre um visor e um protetor de tela.
    if (mexendo) pedirQuadro();
    else ultimo = 0;
  }

  // ----------------------------------------------------------------- salas

  function espera(mais: boolean) {
    emVoo = Math.max(0, emVoo + (mais ? 1 : -1));
    avisar();
  }

  function assentarFusao() {
    if (fundindo === null) return;
    const entrando = camadas[frente === 0 ? 1 : 0];
    const saindo = camadas[frente];
    if (entrando) entrando.material.opacity = 1;
    if (saindo) {
      saindo.material.opacity = 0;
      saindo.cena = null;
    }
    frente = frente === 0 ? 1 : 0;
    fundindo = null;
  }

  function assentarTravessia() {
    if (!travessia) return;
    const { para, entregue } = travessia;
    yaw = travessia.paraYaw;
    pitch = travessia.paraPitch;
    travessia = null;
    if (!entregue) irPara(para, true);
  }

  /**
   * Atravessar uma porta: um movimento só, do meio de uma sala ao meio da
   * outra. A câmera vira para a marca e então viaja naquele rumo, então o
   * ponto clicado segura o meio do quadro e cresce enquanto tudo em volta
   * escorre para fora. Esse fluxo óptico é o que ir a algum lugar parece, e um
   * cruzamento de opacidade não o produz.
   */
  function atravessar(porta: PortaBiotique, destino: CenaBiotique) {
    if (travessia || !atual) return;
    const rumo = mira(porta.yaw, limita(porta.pitch, -INCLINACAO_CHEGADA, INCLINACAO_CHEGADA));
    // Guardado ANTES de trocar de sala: é por onde se volta.
    trilha.push({ cena: atual, dir: rumo.clone() });
    if (menosMovimento.matches) {
      irPara(destino, true);
      return;
    }
    velYaw = 0;
    velPitch = 0;
    // O rumo caminhado é o rumo em que se chega, então uma marca perto do chão
    // é abordada de um pouco acima em vez de mergulhada.
    const paraPitch = limita(porta.pitch, -INCLINACAO_CHEGADA, INCLINACAO_CHEGADA);
    travessia = {
      dir: rumo,
      deYaw: yaw,
      paraYaw: anguloVizinho(yaw, porta.yaw),
      dePitch: pitch,
      paraPitch,
      t: 0,
      para: destino,
      entregue: false,
    };
    // Meio segundo em que nada mais acontece: gastar nisso o download da sala,
    // em vez de começar quando a fusão o quiser.
    void texturaDe(destino.src).catch(() => {});
    avisar();
    pedirQuadro();
  }

  /**
   * Desfaz o último passo.
   *
   * NÃO é uma travessia ao contrário. Manter o rumo ao trocar de sala supõe
   * que os dois panoramas compartilham um norte, e isso vale para frente
   * porque a marca da porta foi medida naquela cena — para trás não há marca
   * medida nenhuma, e apontar `rumo + pi` seria um chute que pode cair numa
   * parede. Então voltar é um corte cruzado para o enquadramento autoral da
   * sala anterior: honesto, e sempre certo.
   */
  function voltar() {
    if (travessia) return;
    const passoAnterior = trilha.pop();
    if (!passoAnterior) return;
    irPara(passoAnterior.cena, false);
  }

  /**
   * @param manterVista true quando se atravessou uma porta — o visitante segue
   *   olhando para onde olhava. Um retorno cai no enquadramento em que a cena
   *   foi composta.
   */
  function irPara(cena: CenaBiotique, manterVista: boolean, imediato = false) {
    if (atual === cena) return;
    if (!manterVista) travessia = null;
    const primeira = atual === null;
    atual = cena;
    falhou = false;
    assentarFusao();

    const entrando = camadas[frente === 0 ? 1 : 0];
    const saindo = camadas[frente];
    if (!entrando || !saindo) return;

    entrando.cena = cena;
    entrando.material.map = null;

    if (!manterVista) {
      yaw = cena.vista.yaw;
      pitch = limita(cena.vista.pitch, -LIMITE_PITCH, LIMITE_PITCH);
      fov = abertura(cena);
    }
    velYaw = 0;
    velPitch = 0;

    // O borrão embutido dá forma à sala nova de imediato; 300 bytes de borrão
    // ganham de um quadro preto enquanto 400 KB estão em voo.
    void texturaDe(cena.borrao)
      .then((textura) => {
        if (entrando.cena === cena && !entrando.material.map) {
          entrando.material.map = textura;
          entrando.material.needsUpdate = true;
          pedirQuadro();
        }
      })
      .catch(() => {});

    espera(true);
    void texturaDe(cena.src)
      .then((textura) => {
        if (entrando.cena !== cena) return;
        entrando.material.map = textura;
        entrando.material.needsUpdate = true;
        pedirQuadro();
      })
      .catch((erro) => {
        if (entrando.cena === cena) {
          falhou = true;
          console.warn("[biotique] sala não carregou", erro);
        }
      })
      .finally(() => espera(false));

    if (imediato || primeira) {
      entrando.material.opacity = 1;
      saindo.material.opacity = 0;
      saindo.cena = null;
      saindo.material.map = null;
      frente = frente === 0 ? 1 : 0;
      fundindo = null;
    } else {
      entrando.material.opacity = 0;
      fundindo = 0;
    }

    desenharMarcas(cena);
    avisar();
    pedirQuadro();
  }

  function desenharMarcas(cena: CenaBiotique) {
    marcas.replaceChildren();
    marcadores = [];
    for (const porta of cena.portas) {
      const destino = porId.get(porta.destino);
      if (!destino) continue;
      const el = document.createElement("button");
      el.type = "button";
      el.className = "porta-360";
      const anel = document.createElement("span");
      anel.className = "porta-360__anel";
      anel.setAttribute("aria-hidden", "true");
      const rotulo = document.createElement("span");
      rotulo.className = "porta-360__rotulo";
      rotulo.textContent = destino.nome;
      el.append(anel, rotulo);
      el.setAttribute("aria-label", rotuloPorta(destino.nome));
      el.addEventListener("click", () => atravessar(porta, destino));
      marcas.append(el);
      // Raio 9, para a marca ficar logo dentro da esfera.
      marcadores.push({ el, dir: mira(porta.yaw, porta.pitch).multiplyScalar(9) });
    }
    // Posicionadas antes do primeiro quadro, ou todas piscam no canto.
    posicionarMarcas();
  }

  // -------------------------------------------------------------- condução

  let arrastando = false;
  let ponteiro = -1;
  let ultimoX = 0;
  let ultimoY = 0;
  let percorrido = 0;
  /** Distância viva da pinça, ou 0 com um dedo só. */
  let pinca = 0;
  const dedos = new Map<number, { x: number; y: number }>();

  /** Radianos por pixel, para o arrasto mover a sala pela distância andada. */
  const porPixel = () => emRad(fov) / Math.max(1, palco.clientHeight);

  function aoPressionar(evento: PointerEvent) {
    if (travessia) return;
    dedos.set(evento.pointerId, { x: evento.clientX, y: evento.clientY });
    if (dedos.size === 2) {
      const [a, b] = [...dedos.values()];
      if (a && b) pinca = Math.hypot(a.x - b.x, a.y - b.y);
      arrastando = false;
      return;
    }
    if (arrastando) return;
    arrastando = true;
    ponteiro = evento.pointerId;
    ultimoX = evento.clientX;
    ultimoY = evento.clientY;
    percorrido = 0;
    velYaw = 0;
    velPitch = 0;
    // Sem captura de ponteiro aqui, de propósito: capturar redireciona o
    // clique de compatibilidade para quem capturou, e um toque numa porta
    // nunca chegaria ao botão. A captura é tomada quando o gesto vira arrasto.
    palco.dataset.arrastando = "sim";
  }

  function aoMover(evento: PointerEvent) {
    const preso = dedos.get(evento.pointerId);
    if (preso) {
      preso.x = evento.clientX;
      preso.y = evento.clientY;
    }

    if (dedos.size === 2 && pinca) {
      const [a, b] = [...dedos.values()];
      if (!a || !b) return;
      const aberto = Math.hypot(a.x - b.x, a.y - b.y);
      if (aberto > 0) {
        fov = limita(fov * (pinca / aberto), FOV_PISO, FOV_TETO);
        pinca = aberto;
        pedirQuadro();
      }
      return;
    }

    if (!arrastando || evento.pointerId !== ponteiro) return;
    const dx = evento.clientX - ultimoX;
    const dy = evento.clientY - ultimoY;
    ultimoX = evento.clientX;
    ultimoY = evento.clientY;
    percorrido += Math.abs(dx) + Math.abs(dy);

    // Passada a folga isto é arrasto, e não toque: tomar a captura agora faz a
    // sala seguir um ponteiro que sai do palco, e entrega aqui o clique com
    // que o gesto termina em vez de na porta sobre a qual ele calhou de parar.
    if (percorrido > FOLGA_ARRASTO && !palco.hasPointerCapture(evento.pointerId)) {
      palco.setPointerCapture(evento.pointerId);
    }

    const k = porPixel();
    // Arrasta para a direita e a sala segue o dedo, o que é virar para a esquerda.
    yaw += dx * k;
    pitch = limita(pitch + dy * k, -LIMITE_PITCH, LIMITE_PITCH);
    // Levada para a inércia na soltura. Um evento de movimento é mais ou menos
    // um quadro, então isto é uma velocidade em tudo menos no nome.
    velYaw = dx * k * 60;
    velPitch = dy * k * 60;
    pedirQuadro();
  }

  function aoSoltar(evento: PointerEvent) {
    dedos.delete(evento.pointerId);
    if (dedos.size < 2) pinca = 0;
    if (evento.pointerId !== ponteiro) return;
    arrastando = false;
    ponteiro = -1;
    delete palco.dataset.arrastando;
    if (palco.hasPointerCapture(evento.pointerId)) {
      palco.releasePointerCapture(evento.pointerId);
    }
    // Um toque não é um arremesso, e menos movimento pede deslizamento nenhum.
    if (percorrido < FOLGA_ARRASTO || menosMovimento.matches) {
      velYaw = 0;
      velPitch = 0;
    }
    pedirQuadro();
  }

  function zoom(por: number) {
    fov = limita(fov * por, FOV_PISO, FOV_TETO);
    pedirQuadro();
  }

  function aoTeclar(evento: KeyboardEvent) {
    if (travessia) return;
    const passos: Record<string, () => void> = {
      ArrowLeft: () => (yaw -= PASSO_TECLA),
      ArrowRight: () => (yaw += PASSO_TECLA),
      ArrowUp: () => (pitch = limita(pitch + PASSO_TECLA, -LIMITE_PITCH, LIMITE_PITCH)),
      ArrowDown: () => (pitch = limita(pitch - PASSO_TECLA, -LIMITE_PITCH, LIMITE_PITCH)),
      "+": () => zoom(1 / PASSO_ZOOM),
      "=": () => zoom(1 / PASSO_ZOOM),
      "-": () => zoom(PASSO_ZOOM),
    };
    const passoTecla = passos[evento.key];
    if (!passoTecla) return;
    // Só as setas e o zoom: Tab, Enter e o resto seguem para a página.
    evento.preventDefault();
    passoTecla();
    pedirQuadro();
  }

  palco.addEventListener("pointerdown", aoPressionar);
  palco.addEventListener("pointermove", aoMover);
  // Na janela, e não no palco: até o arrasto passar da folga não há captura
  // segurando o ponteiro aqui, então uma soltura fora do palco nunca seria
  // contada. NÃO há ouvinte de `wheel` — a roda é da página.
  window.addEventListener("pointerup", aoSoltar);
  window.addEventListener("pointercancel", aoSoltar);
  tela.addEventListener("keydown", aoTeclar);

  const observador = new ResizeObserver(redimensionar);
  observador.observe(palco);

  const aoTrocarVisibilidade = () => {
    if (!ativo) return;
    if (document.hidden) {
      if (quadro) cancelAnimationFrame(quadro);
      quadro = 0;
      ultimo = 0;
    } else {
      pedirQuadro();
    }
  };
  document.addEventListener("visibilitychange", aoTrocarVisibilidade);

  // ------------------------------------------------------------- nascimento

  redimensionar();
  if (!renderizador) {
    falhou = true;
    atual = cenas[0] ?? null;
    avisar();
  } else if (cenas[0]) {
    irPara(cenas[0], false, true);
  }

  return {
    ativar(ligado: boolean) {
      if (ativo === ligado) return;
      ativo = ligado;
      if (ligado) {
        pedirQuadro();
      } else {
        if (quadro) cancelAnimationFrame(quadro);
        quadro = 0;
        ultimo = 0;
        // A inércia não fica pendurada esperando a seção voltar à tela.
        velYaw = 0;
        velPitch = 0;
      }
    },
    voltar,
    destruir() {
      vivo = false;
      ativo = false;
      if (quadro) cancelAnimationFrame(quadro);
      palco.removeEventListener("pointerdown", aoPressionar);
      palco.removeEventListener("pointermove", aoMover);
      window.removeEventListener("pointerup", aoSoltar);
      window.removeEventListener("pointercancel", aoSoltar);
      tela.removeEventListener("keydown", aoTeclar);
      document.removeEventListener("visibilitychange", aoTrocarVisibilidade);
      observador.disconnect();
      marcas.replaceChildren();
      for (const textura of vivas.values()) textura.dispose();
      vivas.clear();
      cache.clear();
      usadas.length = 0;
      for (const camada of camadas) {
        camada.material.map = null;
        camada.material.dispose();
      }
      geometria.dispose();
      renderizador?.dispose();
    },
  };
}
