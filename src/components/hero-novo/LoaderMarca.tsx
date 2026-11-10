import { useEffect, useState } from "react";
import { SimboloLesco } from "@/components/MarcaLesco";
import { FUNDO } from "@/data/hero-novo";

/**
 * A espera do hero novo: o símbolo parado sobre o escuro.
 *
 * Parado é intencional, não um rascunho — é o que foi pedido para esta
 * versão. Um símbolo que gira ou pulsa promete que falta pouco, e aqui o que
 * está acontecendo é o download de dez fotos de tela cheia: a promessa seria
 * mentira em rede ruim. Quando (e se) esta versão virar a de produção, é aqui
 * que entra a animação de abertura.
 *
 * Ele some com um fade, e só então sai do DOM — sair de uma vez deixaria o
 * corte visível no primeiro quadro do hero.
 */

const SAIDA_MS = 450;

export function LoaderMarca({ pronto }: { pronto: boolean }) {
  const [saiu, setSaiu] = useState(false);

  useEffect(() => {
    if (!pronto) return;
    const t = window.setTimeout(() => setSaiu(true), SAIDA_MS);
    return () => window.clearTimeout(t);
  }, [pronto]);

  if (saiu) return null;

  return (
    <div
      aria-hidden={pronto}
      className="fixed inset-0 z-[9998] flex items-center justify-center"
      style={{
        backgroundColor: FUNDO.capa,
        opacity: pronto ? 0 : 1,
        transition: `opacity ${SAIDA_MS}ms ease`,
        pointerEvents: pronto ? "none" : "auto",
      }}
    >
      <SimboloLesco className="w-[52px] sm:w-[64px]" fill="#fffbf3" />
    </div>
  );
}
