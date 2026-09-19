import { SEO } from "@/components/SEO";
import { t } from "@/i18n/t";
import legalHero from "@/assets/legal-hero.jpg";

const sections = [
  {
    id: "objeto",
    title: t("1. Objeto e aceitação"),
    body: [
      t(
        "Estes Termos de Serviço regem o uso do site da Lesco e dos seus canais digitais de atendimento. Ao navegar, solicitar orçamentos, catálogos ou amostras, você declara ter lido, compreendido e aceitado estas condições. Se não concordar com qualquer parte, recomendamos não utilizar os serviços."
      ),
    ],
  },
  {
    id: "atendimento",
    title: t("2. Orçamentos, catálogos e amostras"),
    body: [
      t(
        "Este site tem caráter institucional e comercial: apresentamos linhas de revestimentos, brises, decks e painéis em WPC e recebemos solicitações de orçamento, catálogos e amostras. As solicitações não constituem, por si só, uma venda concluída. A comercialização é formalizada pela nossa equipe comercial mediante proposta específica."
      ),
      t(
        "Preços, prazos, disponibilidade e condições comerciais podem variar conforme o projeto, o volume e a região, e são confirmados no atendimento."
      ),
    ],
  },
  {
    id: "obrigacoes",
    title: t("3. Obrigações do usuário"),
    body: [
      t(
        "Você se compromete a fornecer informações verdadeiras nos formulários e a usar o site de forma lícita, sem praticar atos que possam danificar, sobrecarregar ou comprometer a segurança e o funcionamento da nossa infraestrutura, nem violar direitos de terceiros."
      ),
    ],
  },
  {
    id: "propriedade",
    title: t("4. Propriedade intelectual"),
    body: [
      t(
        "Todos os textos, imagens, renders, fotografias, logotipos, marcas, layouts e demais materiais deste site são de propriedade da Lesco ou de seus licenciadores, protegidos pela legislação de propriedade intelectual. É vedada a reprodução, distribuição, modificação ou uso comercial sem autorização prévia e por escrito."
      ),
    ],
  },
  {
    id: "especificacoes",
    title: t("5. Especificações técnicas e amostras"),
    body: [
      t(
        "Empenhamo-nos para manter cores, texturas, medidas e informações técnicas precisas. Ainda assim, imagens e renders são ilustrativos e podem apresentar variações em relação ao produto físico, decorrentes de iluminação, tela, lotes de fabricação e características naturais dos materiais. Recomendamos a análise de amostras físicas antes da especificação final."
      ),
    ],
  },
  {
    id: "links",
    title: t("6. Links de terceiros"),
    body: [
      t(
        "Nosso site pode conter links para sites de terceiros. Não temos controle sobre o conteúdo, as políticas ou as práticas desses sites e não nos responsabilizamos por eles. O acesso a sites externos é de sua responsabilidade."
      ),
    ],
  },
  {
    id: "responsabilidade",
    title: t("7. Limitação de responsabilidade"),
    body: [
      t(
        "A Lesco se esforça para manter as informações do site corretas e atualizadas, mas não garante a ausência de erros, omissões ou indisponibilidades temporárias. Na máxima extensão permitida pela lei, não nos responsabilizamos por danos indiretos decorrentes do uso ou da impossibilidade de uso do site."
      ),
    ],
  },
  {
    id: "privacidade",
    title: t("8. Privacidade e proteção de dados"),
    body: [
      t(
        "O tratamento de dados pessoais realizado por meio do site observa a Lei Geral de Proteção de Dados (LGPD) e está detalhado na nossa Política de Privacidade, que integra estes Termos."
      ),
    ],
  },
  {
    id: "alteracoes",
    title: t("9. Alterações dos termos"),
    body: [
      t(
        "Podemos atualizar estes Termos a qualquer momento para refletir mudanças legais, técnicas ou de negócio. A versão vigente é sempre a publicada nesta página, com a respectiva data de atualização."
      ),
    ],
  },
  {
    id: "lei",
    title: t("10. Lei aplicável e foro"),
    body: [
      t(
        "Estes Termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro do domicílio do consumidor, quando aplicável, ou o da sede da Lesco para dirimir eventuais controvérsias, sem prejuízo dos direitos previstos no Código de Defesa do Consumidor."
      ),
    ],
  },
];

export default function TermosServico() {
  return (
    <main className="min-h-screen pt-[70px] pb-[10px] px-[10px]">
      <SEO
        title={t("Termos de Serviço | Lesco")}
        description={t("Termos de Serviço da Lesco. Conheça as condições de uso do site e dos nossos serviços.")}
        path="/termos-de-servico"
      />

      {/* Hero */}
      <section className="relative overflow-hidden rounded-[10px] h-[38vh] min-h-[280px] flex items-end">
        <img
          src={legalHero}
          alt={t("Fachada arquitetônica com brises de madeira")}
          className="absolute inset-0 h-full w-full object-cover"
          width={1920}
          height={900}
        />
        {/* 45% deixava a foto clara demais: o rótulo de 11px media 2,37:1. 65%

            aqui equivale ao 0,55 de preto puro já medido no palco da home, e leva

            o texto branco a 4,98:1 mesmo contra um pixel de céu estourado. */}

        <div className="absolute inset-0 bg-lesco-black/65" />
        <div className="relative z-10 px-6 md:px-12 lg:px-20 pb-8 lg:pb-12 max-w-4xl">
          <p className="rotulo-tec text-lesco-white mb-3">
            {t("Atualizado em 9 de julho de 2026")}
          </p>
          <h1 className="font-display text-3xl md:text-4xl lg:text-[52px] font-normal leading-[1.1] text-lesco-white">
            {t("Termos de Serviço")}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="mt-[10px] bg-lesco-white rounded-[10px] px-6 md:px-12 lg:px-20 py-12 lg:py-20">
        <div className="max-w-5xl mx-auto lg:grid lg:grid-cols-[220px_1fr] lg:gap-16">
          {/* TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-[90px]">
              <p className="rotulo-tec text-lesco-black/65 mb-4">
                {t("Nesta página")}
              </p>
              <nav className="space-y-2">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="block font-body text-[13px] text-lesco-black/60 hover:text-lesco-black transition-colors leading-snug"
                  >
                    {s.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Body */}
          <div>
            <p className="font-body text-[15px] text-lesco-black/70 leading-relaxed mb-12 max-w-2xl">
              {t(
                "Estes Termos descrevem as condições gerais de uso do site da Lesco por arquitetos, construtoras, especificadores e demais visitantes. Leia com atenção antes de utilizar nossos canais digitais."
              )}
            </p>

            <div className="space-y-12">
              {sections.map((s) => (
                <div
                  key={s.id}
                  id={s.id}
                  className="scroll-mt-24 border-t border-lesco-black/10 pt-8 first:border-0 first:pt-0"
                >
                  <h2 className="font-display text-xl md:text-2xl text-lesco-black mb-4 font-normal">
                    {s.title}
                  </h2>
                  <div className="space-y-3">
                    {s.body.map((p, i) => (
                      <p key={i} className="font-body text-[14px] text-lesco-black/70 leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              ))}

              {/* Contact card */}
              <div className="scroll-mt-24 bg-lesco-black rounded-[10px] p-6 md:p-8">
                <p className="rotulo-tec text-lesco-white/50 mb-3">
                  {t("11. Contato")}
                </p>
                <p className="font-body text-[14px] text-lesco-white/80 leading-relaxed mb-4">
                  {t("Dúvidas sobre estes Termos podem ser enviadas para:")}
                </p>
                <a
                  href="mailto:contato@lesco.com.br"
                  className="font-display text-lg text-lesco-white underline underline-offset-4 hover:text-accent-warm transition-colors"
                >
                  contato@lesco.com.br
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
