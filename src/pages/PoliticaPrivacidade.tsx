import { SEO } from "@/components/SEO";
import { t } from "@/i18n/t";
import legalHero from "@/assets/legal-hero.jpg";

const sections = [
  {
    id: "controlador",
    title: t("1. Controlador dos dados"),
    body: [
      t(
        "A Lesco é a controladora dos dados pessoais tratados por meio deste site e dos seus canais de atendimento, nos termos da Lei nº 13.709/2018 (Lei Geral de Proteção de Dados Pessoais — LGPD). Isso significa que somos responsáveis pelas decisões sobre o tratamento dos seus dados e por garantir os seus direitos como titular."
      ),
      t(
        "Para qualquer assunto relacionado à privacidade, o contato do nosso Encarregado (DPO) está indicado ao final desta página."
      ),
    ],
  },
  {
    id: "dados-coletados",
    title: t("2. Dados pessoais que coletamos"),
    body: [
      t(
        "Dados fornecidos por você: nome, e-mail, telefone/WhatsApp, empresa, cargo, cidade/UF e informações do projeto (tipo de obra, metragem, linha de interesse) quando você solicita orçamento, catálogos, amostras ou fala com um representante."
      ),
      t(
        "Dados de navegação e uso: endereço IP, identificadores de dispositivo, tipo de navegador, páginas acessadas, tempo de permanência, origem do tráfego e parâmetros de campanha (UTMs), coletados por cookies e tecnologias similares."
      ),
      t(
        "Dados de terceiros: podemos receber dados de plataformas de anúncios e redes sociais quando você interage com nossos conteúdos ou formulários fora deste site."
      ),
    ],
  },
  {
    id: "finalidades",
    title: t("3. Finalidades e bases legais"),
    body: [
      t(
        "Tratamos seus dados apenas para finalidades específicas e legítimas, sempre amparados por uma base legal da LGPD (art. 7º e art. 11):"
      ),
      t(
        "• Responder a solicitações, elaborar orçamentos e enviar catálogos/amostras — execução de procedimentos preliminares e de contrato a pedido do titular."
      ),
      t(
        "• Aprimorar produtos, atendimento e a experiência no site, além de prevenir fraudes — legítimo interesse, sempre respeitando suas expectativas e direitos."
      ),
      t(
        "• Enviar comunicações de marketing sobre revestimentos, brises, decks e novidades de arquitetura sustentável — consentimento, que pode ser revogado a qualquer momento."
      ),
      t(
        "• Cumprir obrigações legais, regulatórias, fiscais e defender direitos em processos — cumprimento de obrigação legal e exercício regular de direitos."
      ),
    ],
  },
  {
    id: "compartilhamento",
    title: t("4. Compartilhamento e operadores"),
    body: [
      t(
        "Não vendemos seus dados pessoais. Podemos compartilhá-los com operadores que nos apoiam na operação do negócio, sempre sob contrato e obrigações de confidencialidade e segurança: provedores de hospedagem e infraestrutura, ferramentas de e-mail e CRM, plataformas de analytics e de anúncios, e representantes comerciais e transportadoras envolvidos no seu atendimento."
      ),
      t(
        "Também podemos compartilhar dados com autoridades públicas quando exigido por lei, ordem judicial ou requisição legal."
      ),
    ],
  },
  {
    id: "transferencia",
    title: t("5. Transferência internacional"),
    body: [
      t(
        "Algumas ferramentas que utilizamos (por exemplo, analytics e hospedagem) podem processar dados em servidores localizados fora do Brasil. Nesses casos, adotamos salvaguardas para assegurar que a transferência ocorra em conformidade com a LGPD e com um nível adequado de proteção."
      ),
    ],
  },
  {
    id: "cookies",
    title: t("6. Cookies e rastreamento"),
    body: [
      t(
        "Utilizamos cookies necessários (essenciais ao funcionamento do site), cookies de desempenho/analytics (para entender como o site é usado) e cookies de marketing (para mensurar campanhas e personalizar anúncios)."
      ),
      t(
        "Você pode gerenciar ou bloquear cookies nas configurações do seu navegador. A desativação de alguns cookies pode afetar funcionalidades do site."
      ),
    ],
  },
  {
    id: "retencao",
    title: t("7. Retenção e descarte"),
    body: [
      t(
        "Mantemos os dados pessoais apenas pelo tempo necessário para cumprir as finalidades desta política ou para atender a obrigações legais e regulatórias. Encerrado esse período, os dados são eliminados de forma segura ou anonimizados."
      ),
    ],
  },
  {
    id: "seguranca",
    title: t("8. Segurança da informação"),
    body: [
      t(
        "Adotamos medidas técnicas e administrativas para proteger os dados contra acessos não autorizados, perda, alteração ou destruição — incluindo controle de acesso, criptografia em trânsito e boas práticas de gestão. Nenhum sistema é 100% inviolável; por isso, atuamos de forma contínua para reduzir riscos."
      ),
    ],
  },
  {
    id: "direitos",
    title: t("9. Seus direitos como titular"),
    highlight: true,
    body: [
      t("Nos termos do art. 18 da LGPD, você tem direito a:"),
      t(
        "• Confirmação da existência de tratamento e acesso aos seus dados; • Correção de dados incompletos, inexatos ou desatualizados; • Anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos; • Portabilidade dos dados a outro fornecedor; • Eliminação dos dados tratados com base no consentimento; • Informação sobre com quem compartilhamos seus dados; • Revogação do consentimento; • Revisão de decisões tomadas de forma automatizada."
      ),
    ],
  },
  {
    id: "exercicio",
    title: t("10. Como exercer seus direitos"),
    body: [
      t(
        "Para exercer qualquer desses direitos, entre em contato com nosso Encarregado pelo e-mail indicado abaixo. Poderemos solicitar informações adicionais para confirmar sua identidade e responderemos dentro dos prazos previstos na LGPD."
      ),
    ],
  },
  {
    id: "menores",
    title: t("11. Menores de idade"),
    body: [
      t(
        "Nossos produtos e canais são destinados a profissionais e ao público adulto. Não coletamos intencionalmente dados de crianças e adolescentes. Caso identifiquemos tal coleta sem o devido amparo legal, os dados serão eliminados."
      ),
    ],
  },
  {
    id: "alteracoes",
    title: t("12. Alterações desta política"),
    body: [
      t(
        "Esta política pode ser atualizada periodicamente para refletir mudanças legais, técnicas ou de nossos serviços. A data da última atualização é sempre indicada no topo desta página."
      ),
    ],
  },
];

export default function PoliticaPrivacidade() {
  return (
    <main className="min-h-screen pt-[70px] pb-[10px] px-[10px]">
      <SEO
        title={t("Política de Privacidade | Lesco")}
        description={t("Política de Privacidade da Lesco. Conheça como tratamos e protegemos suas informações.")}
        path="/politica-de-privacidade"
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
        <div className="absolute inset-0 bg-lesco-black/45" />
        <div className="relative z-10 px-6 md:px-12 lg:px-20 pb-8 lg:pb-12 max-w-4xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-lesco-white/70 mb-3">
            {t("Atualizado em 9 de julho de 2026")}
          </p>
          <h1 className="font-display text-3xl md:text-4xl lg:text-[52px] font-normal leading-[1.1] text-lesco-white">
            {t("Política de Privacidade")}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="mt-[10px] bg-lesco-white rounded-[10px] px-6 md:px-12 lg:px-20 py-12 lg:py-20">
        <div className="max-w-5xl mx-auto lg:grid lg:grid-cols-[220px_1fr] lg:gap-16">
          {/* TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-[90px]">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-lesco-black/40 mb-4">
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
                "Esta página é mantida pela Lesco para explicar, de forma transparente, como coletamos, usamos e protegemos os dados pessoais de arquitetos, construtoras, especificadores e demais visitantes, em conformidade com a Lei Geral de Proteção de Dados (LGPD)."
              )}
            </p>

            <div className="space-y-12">
              {sections.map((s) => (
                <div
                  key={s.id}
                  id={s.id}
                  className={
                    s.highlight
                      ? "scroll-mt-24 bg-lesco-bone rounded-[10px] p-6 md:p-8"
                      : "scroll-mt-24 border-t border-lesco-black/10 pt-8 first:border-0 first:pt-0"
                  }
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

              {/* DPO contact card */}
              <div className="scroll-mt-24 bg-lesco-black rounded-[10px] p-6 md:p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-lesco-white/50 mb-3">
                  {t("13. Encarregado (DPO) e contato")}
                </p>
                <p className="font-body text-[14px] text-lesco-white/80 leading-relaxed mb-4">
                  {t(
                    "Para exercer seus direitos, tirar dúvidas ou registrar reclamações sobre o tratamento dos seus dados, fale com nosso Encarregado. Você também pode acionar a Autoridade Nacional de Proteção de Dados (ANPD)."
                  )}
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
