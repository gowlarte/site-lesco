import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Dica de prioridade de download, no formato que o React 18 realmente aplica.
 *
 * `fetchPriority` em camelDase não é reconhecido por esta versão do React: ele
 * descarta a prop silenciosamente e o atributo nunca chega ao DOM. Não há erro,
 * só um aviso no console e uma dica que nunca existiu. Estava assim em três
 * lugares, incluindo o `<link rel="preload">` da imagem de LCP da home, ou
 * seja, justamente onde a dica mais valeria.
 *
 * Atributo em minúsculas o React passa adiante. O `as` é para o TypeScript,
 * cujos tipos de JSX só conhecem a forma camelCase.
 *
 * Uso: `<img {...prioridade("high")} />`
 */
export function prioridade(nivel: "high" | "low" | "auto" | undefined) {
  if (!nivel) return {};
  return { fetchpriority: nivel } as unknown as { fetchPriority: "high" | "low" | "auto" };
}
