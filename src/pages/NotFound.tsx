import { useLocation } from "react-router-dom";
import { Link } from "@/components/AppLink";
import { useEffect } from "react";
import { SEO } from "@/components/SEO";
import { track404 } from "@/lib/track404";
import { t } from "@/i18n/t";

const sections = [
  { label: t("Madeira Ecológica"), href: "/madeira-ecologica-lesco" },
  { label: t("Portfólio"), href: "/portfolio" },
  { label: t("Catálogo"), href: "/catalogo-lesco" },
  { label: t("Biblioteca"), href: "/biblioteca" },
  { label: t("Quem Somos"), href: "/quem-somos" },
  { label: t("Orçamento"), href: "/orcamento" },
];

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    track404(location.pathname);
  }, [location.pathname]);

  return (
    <main className="min-h-screen bg-background px-[10px] pt-[100px] pb-[10px]">
      <SEO
        title={t("Página não encontrada — Lesco")}
        description={t("A página que você procura não existe ou foi movida. Explore as principais seções do site da Lesco.")}
        path={location.pathname}
        noindex
      />

      <section className="rounded-[10px] bg-primary text-foreground overflow-hidden">
        <div className="container mx-auto px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-2xl">
            <p className="font-mono text-[12px] uppercase tracking-[0.3em] text-muted-foreground">
              {t("Erro 404")}
            </p>
            <h1 className="mt-4 font-display text-5xl md:text-7xl font-medium leading-[0.95]">
              {t("Página não encontrada")}
            </h1>
            <p className="mt-6 font-body text-[15px] font-light text-foreground/70 leading-relaxed max-w-md">
              {t("A página que você procura não existe, mudou de endereço ou está indisponível. Que tal continuar explorando por aqui?")}
            </p>

            <Link
              to="/"
              className="mt-8 inline-flex items-center rounded-[10px] bg-background text-primary px-6 py-3 font-body text-[13px] font-medium uppercase tracking-[0.1em] transition-opacity hover:opacity-90"
            >
              {t("Voltar ao início")}
            </Link>
          </div>

          {/* Principais seções */}
          <div className="mt-16">
            <h2 className="text-[10px] font-body font-medium uppercase tracking-[0.15em] text-muted-foreground mb-5">
              {t("Principais seções")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[10px]">
              {sections.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="rounded-[10px] border border-white/[0.12] px-5 py-4 font-body text-[14px] font-light text-foreground/80 transition-colors hover:border-white/30 hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NotFound;
