import { Link } from "react-router-dom";
import logoLight from "@/assets/logo-lesco-light.svg";

export function Footer() {
  return (
    <footer className="bg-primary text-foreground rounded-[10px] mx-[10px] mb-[10px] my-[10px]">
      {/* Divider */}
      <div className="h-px bg-white/[0.12]" />

      <div className="container mx-auto px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Col 1 — Logo */}
          <div>
            <img src={logoLight} alt="Lesco" className="h-8" />
            <p className="mt-4 font-body text-[13px] font-light text-muted-foreground leading-relaxed max-w-[240px]">
              Arquitetura feita para o amanhã
            </p>
          </div>

          {/* Col 2 — Linhas */}
          <div>
            <h4 className="text-[10px] font-body font-medium uppercase tracking-[0.15em] text-muted-foreground mb-5">Linhas</h4>
            <ul className="space-y-3">
              {[
                { label: "Altwood", href: "/altwood" },
                { label: "Italflex", href: "/italflex" },
                { label: "Zhúzen", href: "/zhuzen" },
                { label: "Echotex", href: "/echotex" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="font-body text-[13px] font-light text-foreground/70 hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Institucional */}
          <div>
            <h4 className="text-[10px] font-body font-medium uppercase tracking-[0.15em] text-muted-foreground mb-5">Institucional</h4>
            <ul className="space-y-3">
              {[
                { label: "Sobre", href: "/sobre" },
                { label: "Projetos", href: "/projetos" },
                { label: "Catálogo", href: "/catalogo" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="font-body text-[13px] font-light text-foreground/70 hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contato */}
          <div>
            <h4 className="text-[10px] font-body font-medium uppercase tracking-[0.15em] text-muted-foreground mb-5">Contato</h4>
            <ul className="space-y-3 font-body text-[13px] font-light text-foreground/70">
              <li>contato@lesco.com.br</li>
              <li className="leading-relaxed">
                Endereço: Av. Osvaldo Reis, 3281 - Praia Brava, Itajaí - SC, 88306-002
              </li>
              <li>Telefone: (11) 94844-9044</li>
              <li className="leading-relaxed">
                Endereço: Avenida Nove de Julho, número 3147, CJ 22 – Jardim Paulista – São Paulo – SP
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-[11px] text-muted-foreground">
            © 2026 Lesco - Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
