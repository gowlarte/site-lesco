import { useState, useEffect, useCallback } from "react";
import { BotaoCTA } from "./BotaoCTA";
import { t } from "@/i18n/t";
import { prioridade } from "@/lib/utils";

interface HeroSectionProps {
  imageSrc?: string;
  images?: string[];
  headline: string;
  subtitulo: string;
  ctaLabel?: string;
  ctaAction?: () => void;
}

/** Tempo que cada foto fica no ar antes da próxima, quando há troca. */
const INTERVALO_MS = 5000;

export const HeroSection = ({ imageSrc, images, headline, subtitulo, ctaLabel, ctaAction }: HeroSectionProps) => {
  const [atual, setAtual] = useState(0);
  /** Ponteiro em cima: pausa enquanto durar. */
  const [sobrevoando, setSobrevoando] = useState(false);
  /**
   * O leitor assumiu o comando (clicou ou tabulou até um ponto). A partir daí
   * a troca automática não volta: seria arrancá-lo da foto que ele escolheu.
   * É também o que satisfaz o critério 2.2.2 da WCAG para quem não usa mouse,
   * já que sobrevoar não é um mecanismo disponível no teclado nem no toque.
   */
  const [comandoManual, setComandoManual] = useState(false);
  const [reduzido, setReduzido] = useState(false);
  /**
   * As fotos seguintes só entram no DOM depois que a primeira carrega.
   *
   * Todas ficam empilhadas em `absolute inset-0`, ou seja, dentro da janela:
   * `loading="lazy"` não adiaria nada, e o hub, que tem seis fotos de tela
   * cheia, baixava as seis de uma vez competindo com a primeira, que é quem
   * marca o LCP.
   */
  const [carregarResto, setCarregarResto] = useState(false);

  const fotos = images || (imageSrc ? [imageSrc] : []);
  const temTroca = fotos.length > 1;

  // Quem pediu menos movimento não recebe troca automática. Os controles
  // continuam funcionando: o que sai é o movimento que ninguém pediu.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const ler = () => setReduzido(mq.matches);
    ler();
    mq.addEventListener("change", ler);
    return () => mq.removeEventListener("change", ler);
  }, []);

  const proxima = useCallback(() => {
    setAtual((i) => (i + 1) % fotos.length);
  }, [fotos.length]);

  const rodando = temTroca && !sobrevoando && !comandoManual && !reduzido;

  useEffect(() => {
    if (!rodando) return;
    const id = setInterval(proxima, INTERVALO_MS);
    return () => clearInterval(id);
  }, [rodando, proxima]);

  const escolher = (i: number) => {
    setAtual(i);
    setComandoManual(true);
  };

  return (
    // `min-h-[100dvh]` e não `h-screen`: no iOS o `vh` é medido com a barra do
    // Safari escondida, então o hero ficava mais alto que a janela e a página
    // dava um pulo quando a barra reaparecia.
    <section
      className="relative w-full min-h-[100dvh] overflow-hidden"
      onMouseEnter={() => setSobrevoando(true)}
      onMouseLeave={() => setSobrevoando(false)}
    >
      {fotos.length > 0 ? (
        fotos.map((src, i) => {
          if (i > 0 && !carregarResto) return null;
          return (
            <img
              key={src}
              src={src}
              /* Foto de fundo atrás do título: é decoração, e o `alt` textual
                 só repetiria o <h1> para quem usa leitor de tela. Antes era
                 "Madeira Ecológica 2", que não descreve imagem nenhuma. */
              alt=""
              aria-hidden="true"
              {...prioridade(i === 0 ? "high" : undefined)}
              onLoad={i === 0 ? () => setCarregarResto(true) : undefined}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
              style={{ opacity: i === atual ? 1 : 0 }}
            />
          );
        })
      ) : (
        <div
          className="absolute inset-0 bg-[#0D0D0D]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
          }}
        />
      )}

      {/* Dark overlay at 60% */}
      <div className="absolute inset-0 bg-[rgba(13,13,13,0.6)]" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-10 md:p-16 lg:p-20">
        <h1 className="font-display text-6xl md:text-7xl lg:text-8xl xl:text-[96px] uppercase tracking-[-0.02em] text-white leading-none mb-4 font-light">
          {headline}
        </h1>
        {/* O subtítulo era #B0B0B0: sobre a foto escurecida a 60% isso cai
            para 2,81:1 quando a foto é clara. Branco a 90% fecha 5,30:1 e
            continua um degrau abaixo do título, que é branco cheio. */}
        {subtitulo?.trim() && (
          <p className="text-white/90 text-lg md:text-xl max-w-lg mb-8 whitespace-pre-line">{subtitulo}</p>
        )}
        {ctaLabel && (
          <div>
            <BotaoCTA variant="secondary" onClick={ctaAction}>
              {ctaLabel}
            </BotaoCTA>
          </div>
        )}

        {/*
          Controles da troca de foto.

          Existem porque antes não existiam: a foto trocava sozinha a cada 5s,
          sem indicação de quantas eram, sem como voltar e sem como parar. Além
          de esconder conteúdo, isso reprova no critério 2.2.2 da WCAG, que
          exige um jeito de pausar qualquer coisa que se mova por mais de cinco
          segundos sem o leitor ter pedido.

          Os pontos não são enfeite: dizem quantas fotos há, qual está no ar, e
          são o próprio controle.

          Ficam junto do conteúdo, à esquerda, e não no canto inferior direito:
          aquele canto é do botão flutuante do WhatsApp, que existe em todas as
          páginas e passa por cima de qualquer coisa que se ponha ali.
        */}
        {temTroca && (
          <div className="mt-8 flex items-center gap-2.5">
            {fotos.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => escolher(i)}
                onFocus={() => setComandoManual(true)}
                aria-label={`${t("Ver foto")} ${i + 1} ${t("de")} ${fotos.length}`}
                aria-current={i === atual ? "true" : undefined}
                className="group p-2 -m-2 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              >
                <span
                  className={
                    "block h-1.5 rounded-full transition-all duration-300 " +
                    (i === atual ? "w-7 bg-white" : "w-1.5 bg-white/50 group-hover:bg-white/80")
                  }
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
