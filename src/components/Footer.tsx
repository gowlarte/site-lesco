import { Link } from "react-router-dom";
import logoLight from "@/assets/logo-lesco-light.svg";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Accent line */}
      <div className="h-px bg-accent" />

      <div className="container mx-auto px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Col 1 — Logo */}
          <div>
            <img src={logoLight} alt="Lesco" className="h-8" />
            <p className="mt-4 font-body text-sm text-primary-foreground/60 leading-relaxed max-w-[240px]">
              Arquitetura feita para o amanhã. Revestimentos premium que definem legados.
            </p>
          </div>

          {/* Col 2 — Linhas */}
          <div>
            <h4 className="text-caption text-primary-foreground/40 mb-5">Linhas</h4>
            <ul className="space-y-3">
              {[
                { label: "Altwood", href: "/altwood" },
                { label: "Zhúzen", href: "/zhuzen", soon: true },
                { label: "Italflex", href: "/italflex", soon: true },
                { label: "Echotex", href: "/echotex", soon: true },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="font-body text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {item.label}
                    {item.soon && (
                      <span className="ml-2 text-[10px] text-accent uppercase tracking-wider">Em breve</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Institucional */}
          <div>
            <h4 className="text-caption text-primary-foreground/40 mb-5">Institucional</h4>
            <ul className="space-y-3">
              {[
                { label: "Sobre", href: "/sobre" },
                { label: "Projetos", href: "/projetos" },
                { label: "Catálogo", href: "/catalogo" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="font-body text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contato */}
          <div>
            <h4 className="text-caption text-primary-foreground/40 mb-5">Contato</h4>
            <ul className="space-y-3 font-body text-sm text-primary-foreground/70">
              <li>contato@lesco.com.br</li>
              <li>+55 (21) 99999-0000</li>
              <li>Rio de Janeiro, Brasil</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-primary-foreground/40">
            © 2026 Lesco · Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
