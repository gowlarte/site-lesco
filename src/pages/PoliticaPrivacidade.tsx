import { SEO } from "@/components/SEO";
import { t } from "@/i18n/t";

export default function PoliticaPrivacidade() {
  return (
    <main className="min-h-screen pt-[120px] pb-[10px] px-[10px]">
      <SEO
        title={t("Política de Privacidade | Lesco")}
        description={t("Política de Privacidade da Lesco. Conheça como tratamos e protegemos suas informações.")}
        path="/politica-de-privacidade"
      />

      <section className="bg-light rounded-[10px] px-6 md:px-12 lg:px-20 py-16 lg:py-24">
        <div className="max-w-3xl mx-auto">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-dark/50 mb-4">
            {t("Atualizado em 9 de julho de 2026")}
          </p>
          <h1 className="font-display text-3xl md:text-4xl lg:text-[48px] font-normal leading-[1.15] text-dark mb-8">
            {t("Política de Privacidade")}
          </h1>
          <p className="font-body text-[14px] text-dark/70 leading-relaxed mb-10">
            {t(
              "Esta página é mantida pela Lesco para responder a questões comuns sobre segurança e privacidade. O conteúdo pode ser atualizado periodicamente para refletir práticas e recursos disponíveis no site."
            )}
          </p>

          <div className="space-y-10">
            <div>
              <h2 className="font-display text-xl text-dark mb-3 font-normal">
                {t("1. Dados que coletamos")}
              </h2>
              <p className="font-body text-[14px] text-dark/70 leading-relaxed">
                {t(
                  "Podemos coletar informações fornecidas voluntariamente por meio de formulários — como nome, e-mail, telefone, empresa e dados do projeto. Também registramos informações técnicas de navegação (endereço IP, tipo de navegador, páginas acessadas e origem do tráfego) para melhorar a experiência do usuário."
                )}
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl text-dark mb-3 font-normal">
                {t("2. Finalidade do uso")}
              </h2>
              <p className="font-body text-[14px] text-dark/70 leading-relaxed">
                {t(
                  "Utilizamos os dados para responder a solicitações, enviar materiais solicitados (catálogos, amostras), aprimorar nossos serviços e comunicar novidades relevantes sobre revestimentos e arquitetura sustentável."
                )}
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl text-dark mb-3 font-normal">
                {t("3. Compartilhamento com terceiros")}
              </h2>
              <p className="font-body text-[14px] text-dark/70 leading-relaxed">
                {t(
                  "Não vendemos dados pessoais. Podemos compartilhar informações com prestadores de serviço que auxiliam na operação do site e no atendimento, sempre sob obrigações de confidencialidade e segurança."
                )}
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl text-dark mb-3 font-normal">
                {t("4. Retenção e exclusão")}
              </h2>
              <p className="font-body text-[14px] text-dark/70 leading-relaxed">
                {t(
                  "Mantemos os dados pelo tempo necessário para cumprir as finalidades descritas nesta política ou conforme exigido por lei. Você pode solicitar a exclusão dos seus dados entrando em contato conosco."
                )}
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl text-dark mb-3 font-normal">
                {t("5. Cookies e tecnologias similares")}
              </h2>
              <p className="font-body text-[14px] text-dark/70 leading-relaxed">
                {t(
                  "Utilizamos cookies para analisar o tráfego do site, entender de onde nossos visitantes vêm e personalizar a experiência. Você pode gerenciar as preferências de cookies no seu navegador."
                )}
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl text-dark mb-3 font-normal">
                {t("6. Segurança")}
              </h2>
              <p className="font-body text-[14px] text-dark/70 leading-relaxed">
                {t(
                  "Adotamos medidas técnicas e administrativas para proteger as informações contra acessos não autorizados, alterações ou destruição. Nenhum sistema é completamente invulnerável; por isso, não podemos garantir segurança absoluta."
                )}
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl text-dark mb-3 font-normal">
                {t("7. Seus direitos")}
              </h2>
              <p className="font-body text-[14px] text-dark/70 leading-relaxed">
                {t(
                  "Você tem o direito de acessar, corrigir, atualizar ou solicitar a exclusão dos seus dados pessoais. Para exercer esses direitos, entre em contato pelo e-mail indicado abaixo."
                )}
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl text-dark mb-3 font-normal">
                {t("8. Contato")}
              </h2>
              <p className="font-body text-[14px] text-dark/70 leading-relaxed">
                {t("Dúvidas sobre esta política podem ser enviadas para:")}{" "}
                <a href="mailto:contato@lesco.com.br" className="underline hover:text-dark transition-colors">
                  contato@lesco.com.br
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
