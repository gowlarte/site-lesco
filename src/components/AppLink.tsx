import { forwardRef } from "react";
import { Link as RRLink, type LinkProps } from "react-router-dom";
import { localizePath } from "@/i18n/routes";

/**
 * Drop-in do <Link> do react-router-dom que traduz automaticamente o `to`
 * (escrito em PT no código) para o slug do locale ativo. No build PT devolve
 * o próprio slug -> comportamento idêntico. Caminhos externos ou não-string
 * passam sem alteração.
 *
 * Uso: troque `import { Link } from "react-router-dom"` por
 * `import { Link } from "@/components/AppLink"`. Os valores `to="/slug-pt"`
 * permanecem os mesmos.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { to, ...rest },
  ref,
) {
  const localizedTo = typeof to === "string" ? localizePath(to) : to;
  return <RRLink ref={ref} to={localizedTo} {...rest} />;
});
