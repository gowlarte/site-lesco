import { Link } from "@/components/AppLink";
import { ArrowLeft } from "lucide-react";
import { SEO } from "@/components/SEO";
import { SecaoOrcamento } from "@/components/altwood/SecaoOrcamento";
import { t } from "@/i18n/t";

/**
 * Muxarabi — tipo de produto da linha de madeira ecológica.
 *
 * Página criada junto com a reestruturação do menu por material. O conteúdo
 * aqui é deliberadamente descritivo: não há tabela de modelos, medidas, pesos
 * nem cartela de cores como nas outras páginas de produto (Brise, Deck, Line,
 * Panel, Shield) porque esses dados ainda não existem para o muxarabi. Quando
 * chegarem, o caminho é seguir o padrão de MantoBrise.tsx (CardModelo +
 * SwatchCor + CardProjeto) em vez de estender esta página.
 */
const aplicacoes = [
  {
    titulo: t("Fachadas e varandas"),
    descricao: t("Filtra a incidência solar direta sem bloquear a ventilação natural, reduzindo o ganho térmico do ambiente."),
  },
  {
    titulo: t("Divisórias e vedações"),
    descricao: t("Separa ambientes preservando a passagem de luz e ar — útil em áreas de transição entre interno e externo."),
  },
  {
    titulo: t("Privacidade"),
    descricao: t("Garante recuo visual em sacadas, áreas de serviço e áreas técnicas sem fechar o vão por completo."),
  },
];

const Muxarabi = () => {
  return (
    <main className="min-h-screen">
      <SEO
        title={t("Muxarabi em Madeira Ecológica | Lesco")}
        description={t("Muxarabi em madeira ecológica WPC: vedação vazada que filtra luz, permite ventilação e garante privacidade em fachadas, varandas e divisórias.")}
        path="/muxarabi-madeira-ecologica"
      />

      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-primary">
        <div className="container mx-auto px-6 lg:px-8">
          <p className="text-caption text-primary-foreground/40 mb-6">{t("Madeira ecológica")}</p>
          <h1 className="font-display text-3xl md:text-5xl lg:text-[64px] font-normal leading-[1.1] text-primary-foreground max-w-4xl">
            {t("Muxarabi.")}
          </h1>
          <p className="mt-8 font-body text-[16px] md:text-[17px] text-primary-foreground/70 leading-[1.7] max-w-xl">
            {t("A trama vazada que controla luz, ar e privacidade ao mesmo tempo — agora em madeira ecológica.")}
          </p>
        </div>
      </section>

      {/* O que é */}
      <section className="section-spacing bg-secondary">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12 lg:gap-20">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-4">
                {t("O produto")}
              </p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-[44px] font-normal leading-[1.15] text-secondary-foreground">
                {t("Um elemento antigo, resolvido com material novo.")}
              </h2>
            </div>
            <div className="space-y-6">
              <p className="text-body-lg text-muted-foreground">
                {t("O muxarabi é uma trama vazada de origem árabe usada há séculos para filtrar a luz e permitir a passagem de ar mantendo a privacidade de quem está dentro. É uma solução de conforto ambiental antes de ser um recurso estético.")}
              </p>
              <p className="text-body-lg text-muted-foreground">
                {t("Executado em madeira ecológica, dispensa verniz e manutenção periódica, e não apresenta os problemas que limitavam o uso da madeira natural em peças vazadas expostas ao tempo.")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Aplicações */}
      <section className="section-spacing bg-secondary">
        <div className="container mx-auto px-6 lg:px-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-4">
            {t("Aplicações")}
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-[44px] font-normal leading-[1.15] text-secondary-foreground mb-12 max-w-2xl">
            {t("Onde o muxarabi resolve.")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[10px]">
            {aplicacoes.map((a) => (
              <div key={a.titulo} className="bg-white/50 rounded-[10px] p-8">
                <h3 className="font-display text-xl text-secondary-foreground mb-3 font-normal">{a.titulo}</h3>
                <p className="font-body text-[14px] text-muted-foreground leading-relaxed">{a.descricao}</p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Link
              to="/madeira-ecologica-lesco"
              className="inline-flex items-center gap-2 font-display text-[12px] uppercase tracking-[0.08em] text-muted-foreground hover:text-secondary-foreground transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              {t("Ver a linha de madeira ecológica")}
            </Link>
          </div>
        </div>
      </section>

      <SecaoOrcamento />
    </main>
  );
};

export default Muxarabi;
