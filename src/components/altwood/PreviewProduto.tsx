import { useState, useRef, useCallback, useEffect } from "react";
import { Link } from "@/components/AppLink";
import { SwatchCor } from "./SwatchCor";
import { BotaoCTA } from "./BotaoCTA";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { t } from "@/i18n/t";

interface SwatchData {
  nome: string;
  corAproximada: string;
}

/**
 * Como o bloco se arruma na página.
 *
 * Existem três porque o hub tinha cinco produtos apresentados com o MESMO
 * arranjo, um embaixo do outro: foto em 60% à esquerda, texto em 40% à
 * direita, cinco vezes. Nem alternava o lado. A quinta fileira não dizia nada
 * que a primeira já não tivesse dito, e a página inteira lia como uma tabela.
 *
 *   destaque  o primeiro produto, em largura cheia com foto grande
 *   divisao   foto e texto lado a lado, com `inverter` para trocar o lado
 *   cartao    compacto, para entrar numa grade de dois
 */
export type FormatoPreview = "destaque" | "divisao" | "cartao";

interface PreviewProdutoProps {
  id: string;
  tag: string;
  titulo: string;
  descricao: string;
  swatches: SwatchData[];
  href: string;
  imageSrc?: string;
  images?: string[];
  formato?: FormatoPreview;
  /** Só vale em `divisao`: põe a foto à direita e o texto à esquerda. */
  inverter?: boolean;
}

export const PreviewProduto = ({
  id,
  tag,
  titulo,
  descricao,
  swatches,
  href,
  imageSrc,
  images,
  formato = "divisao",
  inverter = false,
}: PreviewProdutoProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const allImages = images && images.length > 0 ? images : imageSrc ? [imageSrc] : [];
  const hasSlideshow = allImages.length > 1;

  const startSlideshow = useCallback(() => {
    if (!hasSlideshow) return;
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % allImages.length);
    }, 3000);
  }, [hasSlideshow, allImages.length]);

  const stopSlideshow = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setCurrentIndex(0);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    startSlideshow();
  }, [startSlideshow]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    stopSlideshow();
  }, [stopSlideshow]);

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  const foto = (
    <div
      className={cn(
        "rounded-[var(--aw-radius-card)] overflow-hidden relative",
        formato === "destaque" ? "aspect-[16/9] lg:aspect-[21/9]" : "aspect-[3/2]",
      )}
    >
      {allImages.length > 0 ? (
        allImages.map((src, i) => (
          <img
            key={src}
            src={src}
            /* O texto do link já nomeia o produto logo ao lado. Um `alt` aqui
               só repetiria isso para quem usa leitor de tela, e era literalmente
               "Lesco Brise 2", que não descreve imagem nenhuma. */
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
            style={{
              opacity: i === currentIndex ? (isHovered ? 0.85 : 1) : 0,
              transform: isHovered ? "scale(1.04)" : "scale(1)",
            }}
          />
        ))
      ) : (
        <div className="w-full h-full bg-secondary flex items-center justify-center">
          <ImageIcon className="w-10 h-10 text-primary/65" />
        </div>
      )}
    </div>
  );

  const texto = (
    <div
      className={cn(
        "flex flex-col gap-5",
        formato === "divisao" && "justify-center",
        formato === "cartao" && "gap-4",
      )}
    >
      <span className="rotulo text-accent-ink">{tag}</span>
      <h2
        className={cn(
          "font-display leading-tight text-primary font-light",
          formato === "destaque" && "text-4xl md:text-5xl lg:text-[56px]",
          formato === "divisao" && "text-3xl md:text-4xl lg:text-[44px]",
          formato === "cartao" && "text-2xl md:text-3xl",
        )}
      >
        {titulo}
      </h2>
      <p className="text-[15px] text-muted-foreground leading-relaxed max-w-md">{descricao}</p>
      <div className="flex gap-3 flex-wrap">
        {swatches.map((s) => (
          <SwatchCor key={s.nome} nome={s.nome} corAproximada={s.corAproximada} />
        ))}
      </div>
      <BotaoCTA variant="ghost">{t("Ver linha completa")}</BotaoCTA>
    </div>
  );

  // O cartão não traz respiro nem recuo próprios: quem posiciona é a grade que
  // o contém, no hub.
  if (formato === "cartao") {
    return (
      <section id={id} className="scroll-mt-24">
        <ScrollReveal>
          <Link
            to={href}
            className="flex flex-col gap-6 group cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {foto}
            {texto}
          </Link>
        </ScrollReveal>
      </section>
    );
  }

  if (formato === "destaque") {
    return (
      <section id={id} className="py-24 mx-[10px] my-[10px] scroll-mt-24">
        <ScrollReveal className="px-6 md:px-12 lg:px-20">
          <Link
            to={href}
            className="flex flex-col gap-10 group cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {foto}
            {/* Abaixo da foto o texto abre em duas colunas, para o título não
                ficar sozinho numa linha de 1400px de largura. */}
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-8 lg:gap-16">
              {texto}
            </div>
          </Link>
        </ScrollReveal>
      </section>
    );
  }

  return (
    <section id={id} className="py-24 mx-[10px] my-[10px] scroll-mt-24">
      <ScrollReveal>
        <Link
          to={href}
          className={cn(
            "grid grid-cols-1 lg:grid-cols-[60%_40%] gap-10 lg:gap-16 px-6 md:px-12 lg:px-20 group cursor-pointer",
            inverter && "lg:grid-cols-[40%_60%]",
          )}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* No modo invertido o texto vem primeiro na ordem do documento, que
              é também a ordem de leitura no celular, onde tudo empilha. */}
          {inverter ? (
            <>
              {texto}
              {foto}
            </>
          ) : (
            <>
              {foto}
              {texto}
            </>
          )}
        </Link>
      </ScrollReveal>
    </section>
  );
};
