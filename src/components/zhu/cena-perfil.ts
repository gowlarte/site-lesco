// ---------------------------------------------------------------------------
// Cena three.js do visor de perfil da linha Zhú.
//
// Este módulo é o único lugar do projeto que importa three, e é carregado com
// import() dinâmico a partir de VisorPerfil3D. Fica num pedaço separado do
// bundle: quem nunca clica em "Girar em 3D" nunca baixa nada disso.
//
// Os modelos são amostras de 300 mm dos perfis, com a textura de bambu num
// arquivo externo compartilhado (ver scripts/otimizar-3d.mjs). O primeiro
// modelo custa ~96 KB de textura mais a geometria; a partir do segundo, só a
// geometria, que vai de 9 a 225 KB.
// ---------------------------------------------------------------------------
import {
  Box3,
  Mesh,
  MeshStandardMaterial,
  NeutralToneMapping,
  PCFSoftShadowMap,
  PerspectiveCamera,
  PlaneGeometry,
  PMREMGenerator,
  Scene,
  ShadowMaterial,
  Sphere,
  Spherical,
  DirectionalLight,
  Vector3,
  WebGLRenderer,
  Cache,
  MathUtils,
  TOUCH,
  type Object3D,
  type Texture,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/** O .glb já vem em metros; a amostra tem 300 mm de comprimento. */
const ANGULO_INICIAL = { azimute: 38, polar: 62 };
/** De onde a rotação de entrada parte, em graus a mais de azimute. */
const GIRO_DE_ENTRADA = 34;
const DURACAO_ENTRADA_MS = 900;
/** Quadros que continuam sendo desenhados depois da última interação, para a
 *  inércia do OrbitControls terminar antes de o laço parar. */
const QUADROS_DE_SOBRA = 45;
/** Folga em volta da peça depois do enquadramento exato. */
const MARGEM_DO_QUADRO = 1.08;

export interface CenaPerfil {
  /** Troca o modelo em cena. Descarta o anterior antes de montar o novo. */
  carregar(url: string): Promise<void>;
  /** Gira o azimute, em graus. Usado pelas setas do teclado. */
  girar(graus: number): void;
  /** Reenquadra depois de o canvas mudar de tamanho. */
  redimensionar(): void;
  /** Para o laço enquanto o visor está fora da tela. */
  pausar(pausado: boolean): void;
  destruir(): void;
}

export interface OpcoesCena {
  canvas: HTMLCanvasElement;
  /** Sem rotação de entrada, sem inércia. */
  reduzido: boolean;
}

/** Descarta geometria, material e textura de tudo que pendurou na árvore. */
function descartar(raiz: Object3D) {
  const texturas = new Set<Texture>();
  raiz.traverse((o) => {
    const malha = o as Mesh;
    if (!malha.isMesh) return;
    malha.geometry?.dispose();
    for (const m of Array.isArray(malha.material) ? malha.material : [malha.material]) {
      if (!m) continue;
      const padrao = m as MeshStandardMaterial;
      for (const mapa of [padrao.map, padrao.normalMap, padrao.roughnessMap, padrao.metalnessMap, padrao.aoMap, padrao.emissiveMap]) {
        if (mapa) texturas.add(mapa);
      }
      m.dispose();
    }
  });
  for (const t of texturas) t.dispose();
}

export function criarCena({ canvas, reduzido }: OpcoesCena): CenaPerfil {
  // Os .glb saem do mesmo three que os lê aqui, então o arquivo baixado pode
  // ser reaproveitado ao voltar para um modelo já visto.
  Cache.enabled = true;

  const renderizador = new WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderizador.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderizador.shadowMap.enabled = true;
  renderizador.shadowMap.type = PCFSoftShadowMap;
  // Neutral é o tone mapping que o Khronos publicou para foto de produto:
  // segura o realce sem lavar a cor, que é o que o ACES faria com um bambu.
  renderizador.toneMapping = NeutralToneMapping;
  // Com exposição 1 o topo das ripas estourava e levava junto o veio do bambu,
  // que é justamente o que distingue a peça de um perfil de plástico.
  renderizador.toneMappingExposure = 0.88;

  const cena = new Scene();

  // Iluminação de estúdio gerada em código: não baixa HDR nenhum.
  const pmrem = new PMREMGenerator(renderizador);
  const ambiente = pmrem.fromScene(new RoomEnvironment(), 0.04);
  cena.environment = ambiente.texture;

  // A direcional existe pela sombra de contato: sem ela a peça flutua e some
  // a noção de que é um objeto apoiado numa superfície.
  const sol = new DirectionalLight(0xffffff, 1.0);
  sol.position.set(0.35, 0.6, 0.25);
  sol.castShadow = true;
  sol.shadow.mapSize.set(1024, 1024);
  sol.shadow.bias = -0.0005;
  sol.shadow.camera.near = 0.05;
  sol.shadow.camera.far = 3;
  for (const lado of ["left", "right", "top", "bottom"] as const) {
    sol.shadow.camera[lado] = lado === "left" || lado === "bottom" ? -0.35 : 0.35;
  }
  cena.add(sol);

  const chao = new Mesh(
    new PlaneGeometry(4, 4).rotateX(-Math.PI / 2),
    new ShadowMaterial({ opacity: 0.22 }),
  );
  chao.receiveShadow = true;
  cena.add(chao);

  const camera = new PerspectiveCamera(30, 1, 0.01, 50);
  const alvo = new Vector3();

  const controles = new OrbitControls(camera, canvas);
  controles.enablePan = false;
  // O zoom da roda sequestraria a rolagem da página, que aqui ainda é suave
  // (Lenis): quem passasse o ponteiro por cima do visor ao descer a página
  // ficaria preso dando zoom. O enquadramento já mostra a peça inteira.
  controles.enableZoom = false;
  controles.enableDamping = !reduzido;
  controles.dampingFactor = 0.075;
  controles.rotateSpeed = 0.85;
  // Não deixa passar por baixo do chão nem olhar exatamente de cima.
  controles.minPolarAngle = MathUtils.degToRad(12);
  controles.maxPolarAngle = MathUtils.degToRad(88);
  // Um dedo só não pode girar: quem arrasta para cima está rolando a página, e
  // o canvas engoliria o gesto. Com touch-action pan-y o navegador fica com o
  // movimento vertical e só o horizontal chega aqui, que é o giro que importa.
  controles.touches = { ONE: TOUCH.ROTATE, TWO: TOUCH.ROTATE };
  canvas.style.touchAction = "pan-y";
  // O ponteiro é do OrbitControls, não do CSS: ele escreve `cursor` direto no
  // elemento, então uma classe `cursor-grab` perdia para o estilo embutido.
  // Assim também vem o "grabbing" enquanto o arrasto dura de verdade, e não
  // só enquanto o botão está pressionado em cima do elemento.
  controles.cursorStyle = "grab";

  let modelo: Object3D | null = null;
  let pendentes = 0;
  let laco = 0;
  let pausado = false;
  let destruido = false;
  let entrada: { inicio: number; de: number; para: number } | null = null;
  /** A rotação de entrada e o ângulo padrão valem só para o primeiro modelo. */
  let jaMostrouAlgum = false;
  /** Caixa do modelo em cena, guardada para o reenquadramento do giro. */
  let caixaAtual: Box3 | null = null;

  function pedirQuadros(quantos = QUADROS_DE_SOBRA) {
    pendentes = Math.max(pendentes, quantos);
    if (!laco && !pausado && !destruido) laco = requestAnimationFrame(quadro);
  }

  controles.addEventListener("change", () => pedirQuadros());

  function quadro(agora: number) {
    laco = 0;
    if (destruido) return;

    if (entrada) {
      const f = Math.min(1, (agora - entrada.inicio) / DURACAO_ENTRADA_MS);
      const suave = 1 - Math.pow(1 - f, 3);
      const esfera = new Spherical().setFromVector3(camera.position.clone().sub(alvo));
      esfera.theta = MathUtils.lerp(entrada.de, entrada.para, suave);
      camera.position.copy(alvo).add(new Vector3().setFromSpherical(esfera));
      camera.lookAt(alvo);
      if (f >= 1) entrada = null;
      pendentes = Math.max(pendentes, 2);
    }

    manterNoQuadro();
    controles.update();
    renderizador.render(cena, camera);

    pendentes -= 1;
    if (pendentes > 0 || entrada) laco = requestAnimationFrame(quadro);
  }

  /**
   * Distância mínima em que a caixa da peça cabe inteira no quadro.
   *
   * O caminho curto seria usar o raio da esfera envolvente, mas estas peças
   * são lâminas: 300 × 143 × 18 mm. A esfera de uma lâmina é quase toda ar, e
   * a câmera parava longe demais — a peça ocupava metade do quadro e o resto
   * era branco. Aqui os oito vértices da caixa são projetados nos eixos da
   * câmera e cada um diz de que distância ele precisa; fica a maior.
   */
  function distanciaParaCaber(caixa: Box3, direcao: Vector3) {
    const direita = new Vector3().crossVectors(new Vector3(0, 1, 0), direcao).normalize();
    const cima = new Vector3().crossVectors(direcao, direita).normalize();
    const tanV = Math.tan(MathUtils.degToRad(camera.fov) / 2);
    const tanH = tanV * camera.aspect;

    let maior = 0;
    const p = new Vector3();
    for (let i = 0; i < 8; i++) {
      p.set(
        i & 1 ? caixa.max.x : caixa.min.x,
        i & 2 ? caixa.max.y : caixa.min.y,
        i & 4 ? caixa.max.z : caixa.min.z,
      ).sub(alvo);
      const profundidade = p.dot(direcao);
      maior = Math.max(
        maior,
        profundidade + Math.abs(p.dot(direita)) / tanH,
        profundidade + Math.abs(p.dot(cima)) / tanV,
      );
    }
    return maior * MARGEM_DO_QUADRO;
  }

  /**
   * Afasta a câmera se o giro tiver posto a peça para fora do quadro.
   *
   * O enquadramento exato vale para UM ângulo; girando, a silhueta muda e o
   * que cabia deixa de caber. A distância que caberia em qualquer ângulo é a
   * da esfera envolvente, e para uma lâmina ela é 1,42x a necessária — a peça
   * nasceria ocupando 70% do que podia.
   *
   * Então a câmera nasce no enquadramento justo e só afasta, nunca aproxima.
   * Afastar e voltar a aproximar a cada grau girado faria a peça respirar,
   * que é pior de olhar do que uma peça um pouco menor.
   */
  function manterNoQuadro() {
    if (!caixaAtual) return;
    const desloc = camera.position.clone().sub(alvo);
    const distancia = desloc.length();
    if (distancia < 1e-6) return;
    const necessaria = distanciaParaCaber(caixaAtual, desloc.divideScalar(distancia));
    if (necessaria > distancia) camera.position.copy(alvo).addScaledVector(desloc, necessaria);
  }

  /** Põe a câmera onde a peça inteira caiba, seja qual for o formato do canvas. */
  function enquadrar(primeiraVez: boolean) {
    if (!modelo) return;
    const caixa = new Box3().setFromObject(modelo);
    caixaAtual = caixa;
    const bola = caixa.getBoundingSphere(new Sphere());
    alvo.copy(bola.center);
    controles.target.copy(alvo);

    // Na troca de modelo o ângulo que o leitor escolheu é preservado; só a
    // distância se ajusta ao novo tamanho. É o que deixa dois perfis
    // comparáveis: mesmo ponto de vista, mesma luz.
    const esfera = new Spherical();
    if (primeiraVez) {
      esfera.set(1, MathUtils.degToRad(ANGULO_INICIAL.polar), MathUtils.degToRad(ANGULO_INICIAL.azimute));
    } else {
      esfera.setFromVector3(camera.position.clone().sub(alvo));
    }
    const direcao = new Vector3().setFromSpherical(esfera).normalize();
    const distancia = distanciaParaCaber(caixa, direcao);

    camera.position.copy(alvo).addScaledVector(direcao, distancia);
    camera.near = Math.max(0.01, distancia - bola.radius * 3);
    camera.far = distancia + bola.radius * 6;
    camera.updateProjectionMatrix();
    camera.lookAt(alvo);
    controles.update();

    // A luz fica do lado OPOSTO ao da câmera. Vinda de cima e de trás da peça,
    // a sombra cai para o lado que a câmera enxerga; com a luz do lado de cá,
    // ela cai debaixo da peça e a própria peça a esconde — foi o que aconteceu
    // na primeira montagem, e o painel ficou boiando no branco.
    sol.position
      .copy(alvo)
      .add(new Vector3(-bola.radius, bola.radius * 2.5, -bola.radius * 0.6));
    sol.target.position.copy(alvo);
    sol.target.updateMatrixWorld();
    const meia = bola.radius * 1.6;
    sol.shadow.camera.left = -meia;
    sol.shadow.camera.right = meia;
    sol.shadow.camera.top = meia;
    sol.shadow.camera.bottom = -meia;
    sol.shadow.camera.far = bola.radius * 8;
    sol.shadow.camera.updateProjectionMatrix();
  }

  function ajustarTamanho() {
    const l = canvas.clientWidth || 1;
    const a = canvas.clientHeight || 1;
    renderizador.setSize(l, a, false);
    camera.aspect = l / a;
    camera.updateProjectionMatrix();
  }

  const carregador = new GLTFLoader();

  return {
    async carregar(url: string) {
      const gltf = await carregador.loadAsync(url);
      if (destruido) {
        descartar(gltf.scene);
        return;
      }
      if (modelo) {
        cena.remove(modelo);
        descartar(modelo);
      }
      modelo = gltf.scene;
      modelo.traverse((o) => {
        const malha = o as Mesh;
        if (!malha.isMesh) return;
        malha.castShadow = true;
        malha.receiveShadow = true;
      });
      cena.add(modelo);

      const primeiro = !jaMostrouAlgum;
      jaMostrouAlgum = true;
      ajustarTamanho();
      enquadrar(primeiro);
      // O chão fica logo abaixo da peça: as amostras são modeladas com a base
      // em y=0, mas uma folga evita z-fighting na sombra.
      chao.position.y = new Box3().setFromObject(modelo).min.y - 0.0005;

      if (!reduzido && primeiro) {
        const esfera = new Spherical().setFromVector3(camera.position.clone().sub(alvo));
        entrada = {
          inicio: performance.now(),
          de: esfera.theta + MathUtils.degToRad(GIRO_DE_ENTRADA),
          para: esfera.theta,
        };
      }
      pedirQuadros();
    },

    girar(graus: number) {
      const esfera = new Spherical().setFromVector3(camera.position.clone().sub(alvo));
      esfera.theta += MathUtils.degToRad(graus);
      camera.position.copy(alvo).add(new Vector3().setFromSpherical(esfera));
      camera.lookAt(alvo);
      controles.update();
      pedirQuadros();
    },

    redimensionar() {
      ajustarTamanho();
      enquadrar(false);
      pedirQuadros(2);
    },

    pausar(valor: boolean) {
      pausado = valor;
      if (pausado) {
        if (laco) cancelAnimationFrame(laco);
        laco = 0;
      } else {
        pedirQuadros(2);
      }
    },

    destruir() {
      destruido = true;
      if (laco) cancelAnimationFrame(laco);
      controles.dispose();
      if (modelo) descartar(modelo);
      chao.geometry.dispose();
      (chao.material as ShadowMaterial).dispose();
      ambiente.texture.dispose();
      pmrem.dispose();
      renderizador.dispose();
      // Sem isto o contexto WebGL sobrevive à desmontagem e o navegador vai
      // descartando os mais antigos quando o limite chega, derrubando visores
      // que ainda estão em uso.
      renderizador.forceContextLoss();
    },
  };
}
