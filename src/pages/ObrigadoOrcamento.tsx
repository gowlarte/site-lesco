import { SEO } from "@/components/SEO";
import { t } from "@/i18n/t";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import obrigadoBg from "@/assets/obrigado-bg.webp";
import logoLight from "@/assets/logo-lesco-light.svg";
import lescoIcon from "@/assets/lesco-icon.webp";

const socials = [
  { label: "Facebook", href: "https://www.facebook.com/lescorevestimentosbr/", Icon: Facebook },
  { label: "Instagram", href: "https://www.instagram.com/lesco_br/", Icon: Instagram },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/lesco-revestimentos/about/", Icon: Linkedin },
  { label: "YouTube", href: "https://www.youtube.com/@LescoBR", Icon: Youtube },
];

const TikTok = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16.6 5.82a4.28 4.28 0 0 1-1.06-2.82h-3.13v12.43a2.4 2.4 0 1 1-1.7-2.3V9.9a5.53 5.53 0 1 0 4.83 5.48V9.01a7.36 7.36 0 0 0 4.31 1.38V7.26a4.28 4.28 0 0 1-3.25-1.44Z" />
  </svg>
);

export default function ObrigadoOrcamento() {
  return (
    <>
      <SEO
        title={t("Pedido de orçamento recebido | Lesco")}
        description={t("Recebemos seu pedido de orçamento. Em breve entraremos em contato. Acompanhe as novidades da Lesco enquanto aguarda.")}
        path="/obrigado-orcamento"
      />


      {/* Hero */}
      <section
        className="relative min-h-[80vh] flex items-center justify-center rounded-[10px] mx-[10px] mt-[100px] overflow-hidden"
        style={{
          backgroundImage: `url(${obrigadoBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 text-center px-6 max-w-2xl mx-auto py-24">
          <img src={logoLight} alt="Lesco" className="h-12 md:h-14 mx-auto" />

          <h1 className="mt-8 font-display text-2xl md:text-4xl font-normal text-white">
            {t("Pedido de orçamento recebido!")}
          </h1>

          <p className="mt-6 font-body text-base md:text-lg text-white/90 leading-relaxed">
            {t("Agradecemos seu interesse! Em breve entraremos em contato para conversarmos sobre o seu orçamento.")}
          </p>

          <p className="mt-4 font-body text-sm text-white/85">
            {t("Qualquer dúvida, entre em contato conosco.")}
          </p>
        </div>
      </section>

      {/* Novidades + redes sociais */}
      <section className="py-20 md:py-28 px-6 text-center">
        <p className="font-body text-lg md:text-xl text-black max-w-3xl mx-auto">
          {t("Enquanto você aguarda seu orçamento, acompanhe todas as novidades e últimas atualizações da Lesco.")}
        </p>

        <div className="mt-12 flex items-center justify-center gap-6">
          {socials.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-black hover:text-black/70 transition-colors"
            >
              <Icon className="h-6 w-6" />
            </a>
          ))}
          <a
            href="https://www.tiktok.com/@lescorevestimentos"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="text-black hover:text-black/70 transition-colors"
          >
            <TikTok className="h-5 w-5" />
          </a>
        </div>

        <img src={lescoIcon} alt="Lesco" className="mt-16 h-16 w-16 mx-auto" />
      </section>
    </>
  );
}
