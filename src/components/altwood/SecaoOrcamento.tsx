import { BotaoCTA } from "./BotaoCTA";

interface SecaoOrcamentoProps {
  imageSrc?: string;
}

export const SecaoOrcamento = ({ imageSrc }: SecaoOrcamentoProps) => (
  <section className="relative py-[120px] overflow-hidden">
    {/* Background */}
    {imageSrc ? (
      <>
        <img src={imageSrc} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[rgba(13,13,13,0.75)]" />
      </>
    ) : (
      <div className="absolute inset-0 bg-[#0F0F0F] my-0 mx-0" />
    )}
    {/* Content */}
    <div className="relative z-10 flex flex-col items-center text-center px-6">
      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-8">
        Solicite seu Orçamento
      </h2>
      <BotaoCTA variant="primary" className="mb-8">Falar com um especialista</BotaoCTA>
      <p className="text-[13px] text-[#7F7F7F] leading-relaxed">
        Florianópolis, SC &middot; São Paulo, SP<br />
        @lesco_br &middot; lesco.com.br &middot; (11) 94844-9044
      </p>
    </div>
  </section>
);
