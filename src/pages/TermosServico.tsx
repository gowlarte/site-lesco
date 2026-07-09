import { SEO } from "@/components/SEO";
import { t } from "@/i18n/t";

export default function TermosServico() {
  return (
    <main className="min-h-screen pt-[120px] pb-[10px] px-[10px]">
      <SEO
        title={t("Termos de Serviço | Lesco")}
        description={t("Termos de Serviço da Lesco. Conheça as condições de uso do site e dos nossos serviços.")}
        path="/termos-de-servico"
      />

      <section className="bg-light rounded-[10px] px-6 md:px-12 lg:px-20 py-16 lg:py-24">
        <div className="max-w-3xl mx-auto">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-dark/50 mb-4">
            {t("Atualizado em 9 de julho de 2026")}
          </p>
          <h1 className="font-display text-3xl md:text-4xl lg:text-[48px] font-normal leading-[1.15] text-dark mb-8">
            {t("Termos de Serviço")}
          </h1>
          <p className="font-body text-[14px] text-dark/70 leading-relaxed mb-10">
            {t(
              "Esta página é mantida pela Lesco e descreve as condições gerais de uso do site. Ao acessar e utilizar nossos canais digitais, você concorda com os termos aqui descritos."
            )}
          </p>

          <div className="space-y-10">
            <div>
              <h2 className="font-display text-xl text-dark mb-3 font-normal">
                {t("1. Aceitação dos termos")}
              </h2>
              <p className="font-body text-[14px] text-dark/70 leading-relaxed">
                {t(
                  "Ao navegar neste site, solicitar orçamentos, catálogos ou amostras, você aceita e concorda em cumprir estes Termos de Serviço. Se não concordar com alguma parte dos termos, recomendamos que não utilize os serviços oferecidos."
                )}
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl text-dark mb-3 font-normal">
                {t("2. Uso do site")}
              </h2>
              <p className="font-body text-[14px] text-dark/70 leading-relaxed">
                {t(
                  "O conteúdo deste site é destinado a fins informativos e comerciais. Você se compromete a usar o site de forma lícita, sem praticar atos que possam danificar, inutilizar ou sobrecarregar nossa infraestrutura."
                )}
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl text-dark mb-3 font-normal">
                {t("3. Propriedade intelectual")}
              </h2>
              <p className="font-body text-[14px] text-dark/70 leading-relaxed">
                {t(
                  "Todos os textos, imagens, logotipos, marcas e demais materiais disponíveis no site são de propriedade da Lesco ou de seus licenciadores, protegidos pelas leis de propriedade intelectual. É proibida a reprodução, distribuição ou modificação sem autorização prévia e por escrito."
                )}
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl text-dark mb-3 font-normal">
                {t("4. Links para sites de terceiros")}
              </h2>
              <p className="font-body text-[14px] text-dark/70 leading-relaxed">
                {t(
                  "Nosso site pode conter links para sites de terceiros. Não temos controle sobre o conteúdo, políticas ou práticas desses sites e não nos responsabilizamos por eles."
                )}
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl text-dark mb-3 font-normal">
                {t("5. Limitação de responsabilidade")}
              </h2>
              <p className="font-body text-[14px] text-dark/70 leading-relaxed">
                {t(
                  "A Lesco se esforça para manter as informações do site precisas e atualizadas, mas não garante a ausência de erros ou omissões. O uso das informações é por sua conta e risco."
                )}
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl text-dark mb-3 font-normal">
                {t("6. Alterações nos termos")}
              </h2>
              <p className="font-body text-[14px] text-dark/70 leading-relaxed">
                {t(
                  "Podemos atualizar estes Termos de Serviço a qualquer momento. Recomendamos que você revise esta página periodicamente para se manter informado sobre eventuais mudanças."
                )}
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl text-dark mb-3 font-normal">
                {t("7. Contato")}
              </h2>
              <p className="font-body text-[14px] text-dark/70 leading-relaxed">
                {t("Dúvidas sobre estes termos podem ser enviadas para:")}{" "}
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
