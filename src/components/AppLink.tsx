import { forwardRef } from "react";
import { Link as RRLink, type LinkProps } from "react-router-dom";
import { localizePath } from "@/i18n/routes";
import { useCaminhoDaProva } from "@/lib/marca";

/**
 * Drop-in do <Link> do react-router-dom que ajusta o `to` sozinho, em duas
 * etapas. Caminhos externos ou não-string passam sem alteração.
 *
 * 1. LOCALE. O `to` é escrito em PT no código; aqui ele vira o slug do locale
 *    ativo. No build PT devolve o próprio slug, então o comportamento é
 *    idêntico.
 *
 * 2. SITE DE PROVA. Estando dentro de /lesco-new, todo link para dentro do
 *    site ganha o prefixo. É isto que faz a prova ser um SITE e não uma
 *    página: clicar em "Brise" na home 2.0 leva a
 *    /lesco-new/brise-madeira-ecologica — a mesma página de sempre, com o
 *    logotipo novo — em vez de jogar o leitor de volta no site de produção.
 *
 *    Como mora aqui, vale para todo link do site de uma vez: o menu, os CTAs
 *    do hero, o rodapé, as grades de produto. Nenhuma página precisou saber
 *    que a prova existe.
 *
 *    `to="/"` vira a home DA PROVA. Links que já apontam para dentro dela
 *    passam intactos, senão o prefixo entraria duas vezes.
 *
 * Uso: troque `import { Link } from "react-router-dom"` por
 * `import { Link } from "@/components/AppLink"`. Os valores `to="/slug-pt"`
 * permanecem os mesmos.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { to, ...rest },
  ref,
) {
  const manterNaProva = useCaminhoDaProva();
  const destino = typeof to === "string" ? manterNaProva(localizePath(to)) : to;

  return <RRLink ref={ref} to={destino} {...rest} />;
});
