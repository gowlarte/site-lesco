import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Bloco que entra com fade quando alcança a janela.
 *
 * O estado escondido NÃO vem daqui: vem da classe `.revelar` no
 * src/index.css, que só esconde quando o <html> tem `.com-js`. Isso importa
 * porque este site é pré-renderizado. Antes o componente cravava `opacity-0`
 * no elemento, e o HTML estático ia para o ar com o conteúdo invisível para
 * quem não executa JS.
 *
 * O mesmo bloco de CSS desliga o movimento sob `prefers-reduced-motion`.
 */
export function ScrollReveal({ children, className, delay = 0 }: ScrollRevealProps) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={cn("revelar", className)}
      data-visivel={isVisible ? "sim" : undefined}
      style={delay ? { animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
