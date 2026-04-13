import { BotaoCTA } from "./BotaoCTA";

interface CardModeloProps {
  imageSrc?: string;
  nome: string;
  medida: string;
  peso: string;
  onOrcamento?: () => void;
}

export const CardModelo = ({ imageSrc, nome, medida, peso, onOrcamento }: CardModeloProps) => (
  <div className="bg-[#141414] rounded-[var(--aw-radius-card)] overflow-hidden transition-all duration-[350ms] hover:-translate-y-1 hover:border-[#C8956C] border border-[#1E1E1E] group"
    style={{ boxShadow: "var(--aw-shadow-card)" }}
  >
    <div className="aspect-video bg-[#1A1A1A] flex items-center justify-center">
      {imageSrc ? (
        <img src={imageSrc} alt={nome} className="w-full h-full object-cover" />
      ) : (
        <span className="text-[#525252] text-sm">Imagem do produto</span>
      )}
    </div>
    <div className="p-5 flex flex-col gap-1">
      <h3 className="text-white text-sm font-medium">{nome}</h3>
      <p className="text-[#7F7F7F] text-xs">{medida}</p>
      <p className="text-[#525252] text-xs">{peso}</p>
      <div className="mt-3">
        <BotaoCTA variant="primary" onClick={onOrcamento} className="w-full text-xs py-2.5">
          Solicitar Orçamento
        </BotaoCTA>
      </div>
    </div>
  </div>
);
