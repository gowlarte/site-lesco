import { useCallback, useEffect, useRef, useState } from "react";
import { t } from "@/i18n/t";
import { cn } from "@/lib/utils";
import type { CenaPerfil } from "./cena-perfil";

/** Onde scripts/otimizar-3d.mjs publica os modelos. */
const PASTA = "/3d/zhu/";

/** Liga o canvas à linha de instrução, via aria-describedby. Só existe um
 *  visor por página, então um id fixo basta. */
const ID_INSTRUCAO = "visor-perfil-instrucao";

export interface ModeloVisor {
  nome: string;
  /** Nome do .glb em public/3d/zhu, sem extensão. */
  arquivo: string;
  medida: string;
  /** Render 2D do perfil, usado como cartaz antes de o 3D entrar. */
  imagem: string;
}

/**
 * Visor de perfil da linha Zhú.
 *
 * POR QUE UM VISOR SÓ, E NÃO UM POR MODELO
 *
 * Os dez perfis desta família diferem no corte transversal, que é a coisa que
 * uma foto de frente não mostra. Um visor por card daria dez contextos WebGL
 * na mesma página (o navegador derruba os mais antigos quando passa do
 * limite) e dez molduras pequenas demais para ler um sulco de 3 mm. Um visor
 * grande, com os modelos como controle, mostra o perfil no tamanho que
 * importa e — porque a câmera não se mexe na troca — deixa dois modelos
 * comparáveis: mesmo ângulo, mesma luz, só a peça muda.
 *
 * QUANDO O 3D BAIXA
 *
 * Nunca, até alguém pedir. O visor abre com o render 2D que o card já usa e
 * um botão; three.js (~170 KB) e a textura (96 KB) só saem do servidor no
 * clique. Passar o ponteiro pelo botão já começa a baixar o código, então
 * quem clica quase não espera.
 *
 * A grade de modelos e a tabela de especificação continuam sendo a fonte dos
 * números. Este bloco é ilustração: não some nada se o WebGL faltar.
 */
export const VisorPerfil3D = ({ modelos }: { modelos: ModeloVisor[] }) => {
  const [indice, setIndice] = useState(0);
  const [ativo, setAtivo] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [falhou, setFalhou] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const molduraRef = useRef<HTMLDivElement>(null);
  const cenaRef = useRef<CenaPerfil | null>(null);

  const atual = modelos[indice];
  const pronto = ativo && !carregando && !falhou;
  // O efeito de carga depende DESTE valor, não do array `modelos`. O array é
  // remontado a cada render do componente-pai, e dependendo dele o visor
  // recarregava o modelo toda vez que qualquer outra coisa da página mudava de
  // estado — abrir o acordeão de especificações técnicas, por exemplo.
  const arquivo = atual.arquivo;

  /** Começa a baixar o pedaço do three antes do clique. */
  const adiantar = useCallback(() => {
    void import("./cena-perfil");
  }, []);

  useEffect(() => {
    if (!ativo) return;
    let cancelado = false;
    setCarregando(true);
    setFalhou(false);

    (async () => {
      try {
        const { criarCena } = await import("./cena-perfil");
        if (cancelado || !canvasRef.current) return;
        if (!cenaRef.current) {
          cenaRef.current = criarCena({
            canvas: canvasRef.current,
            reduzido: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
          });
        }
        await cenaRef.current.carregar(`${PASTA}${arquivo}.glb`);
        if (!cancelado) setCarregando(false);
      } catch {
        // Sem WebGL, arquivo fora do ar, contexto recusado: em qualquer caso
        // o cartaz volta e a página segue inteira.
        if (!cancelado) {
          setFalhou(true);
          setCarregando(false);
        }
      }
    })();

    return () => {
      cancelado = true;
    };
  }, [ativo, arquivo]);

  // Um contexto WebGL por página já é bastante; sair da página tem de levá-lo
  // junto. O laço de desenho também para quando o visor sai da tela.
  useEffect(
    () => () => {
      cenaRef.current?.destruir();
      cenaRef.current = null;
    },
    [],
  );

  useEffect(() => {
    const moldura = molduraRef.current;
    if (!ativo || !moldura) return;

    const aoRedimensionar = new ResizeObserver(() => cenaRef.current?.redimensionar());
    aoRedimensionar.observe(moldura);

    const aoEntrar = new IntersectionObserver(
      ([e]) => cenaRef.current?.pausar(!e.isIntersecting),
      { threshold: 0 },
    );
    aoEntrar.observe(moldura);

    return () => {
      aoRedimensionar.disconnect();
      aoEntrar.disconnect();
    };
  }, [ativo]);

  const aoTeclar = (e: React.KeyboardEvent) => {
    if (!pronto) return;
    const passo = e.key === "ArrowLeft" ? -12 : e.key === "ArrowRight" ? 12 : 0;
    if (!passo) return;
    e.preventDefault();
    cenaRef.current?.girar(passo);
  };

  if (modelos.length === 0) return null;

  return (
    <div className="mb-12">
      <span className="block rotulo text-[#525252] mb-6">{t("Perfil em 3D")}</span>

      <div className="bg-white rounded-[10px] overflow-hidden">
        <div
          ref={molduraRef}
          className="relative aspect-[4/3] sm:aspect-[3/2] lg:aspect-[21/9] bg-white"
        >
          {/* O cartaz é o mesmo render que o card do modelo usa. Continua no
              DOM por baixo do canvas até o primeiro quadro sair, para a troca
              não piscar em branco. */}
          <img
            src={atual.imagem}
            alt=""
            aria-hidden="true"
            className={cn(
              "absolute inset-0 w-full h-full object-contain p-8 transition-opacity duration-500",
              pronto && "opacity-0",
            )}
          />

          {ativo && !falhou && (
            <canvas
              ref={canvasRef}
              tabIndex={0}
              role="img"
              aria-label={`${atual.nome} — ${t("amostra do perfil em três dimensões")}`}
              // O elemento recebe foco e gira com as setas; sem isto, nada
              // anuncia essa segunda parte para quem não usa o mouse.
              aria-describedby={ID_INSTRUCAO}
              onKeyDown={aoTeclar}
              // O cursor (grab/grabbing) quem põe é o OrbitControls, em
              // src/components/zhu/cena-perfil.ts: ele escreve no style do
              // elemento e ganharia de qualquer classe aqui.
              className={cn(
                "absolute inset-0 w-full h-full transition-opacity duration-500",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:-outline-offset-2",
                pronto ? "opacity-100" : "opacity-0",
              )}
            />
          )}

          {!ativo && (
            <div className="absolute inset-0 flex items-end justify-center pb-6">
              <button
                type="button"
                onClick={() => setAtivo(true)}
                onPointerEnter={adiantar}
                onFocus={adiantar}
                className="rounded-[var(--aw-radius-btn)] bg-primary px-5 py-2.5 text-[13px] font-medium text-primary-foreground transition-opacity duration-300 hover:opacity-90 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
              >
                {t("Girar em 3D")}
              </button>
            </div>
          )}

          {carregando && (
            <p className="absolute inset-x-0 bottom-6 text-center text-xs text-[#525252]" role="status">
              {t("Carregando modelo…")}
            </p>
          )}

          {falhou && (
            <p className="absolute inset-x-0 bottom-6 text-center text-xs text-[#525252]">
              {t("Não foi possível abrir o modelo 3D neste dispositivo. O desenho do perfil está acima.")}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-primary/15 px-5 py-3">
          <span className="font-display text-[13px] uppercase tracking-[0.06em] text-gray-950">
            {atual.nome}
          </span>
          <span className="text-xs text-[#525252]">
            {atual.medida} · {t("amostra de 300 mm")}
            {pronto && (
              <>
                {" · "}
                <span id={ID_INSTRUCAO}>{t("arraste ou use as setas para girar")}</span>
              </>
            )}
          </span>
        </div>
      </div>

      {/* Os mesmos dez modelos da grade acima, aqui como controle do visor.
          Quebram em duas linhas em vez de rolar na horizontal: numa régua que
          rola, os últimos modelos ficam escondidos atrás da borda, e ninguém
          procura o que não sabe que existe. */}
      <div className="mt-4">
        <div className="flex flex-wrap gap-1">
          {modelos.map((m, i) => (
            <button
              key={m.arquivo}
              type="button"
              aria-pressed={i === indice}
              onClick={() => setIndice(i)}
              onPointerEnter={adiantar}
              className={cn(
                "rounded-[var(--aw-radius-btn)] px-3 py-1.5 text-xs transition-colors duration-300 cursor-pointer",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2",
                i === indice
                  ? "bg-primary text-primary-foreground"
                  : "text-[#525252] hover:bg-primary/10 hover:text-primary",
              )}
            >
              {m.nome}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
