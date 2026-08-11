import { Link } from "@/components/AppLink";
import { t } from "@/i18n/t";

interface CardModeloProps {
  imageSrc?: string;
  nome: string;
  medida: string;
  peso?: string;
  /**
   * Linha de título acima da medida. A madeira ecológica identifica o produto
   * pela própria medida, então não usa; a Zhú identifica por nome de modelo
   * ("Infinty Wave"), que precisa ficar visível.
   */
  titulo?: string;
  /** Ocupa o lugar do peso quando a linha não especifica peso (caso da Zhú). */
  nota?: string;
  onOrcamento?: () => void;
}

export const CardModelo = ({
  imageSrc,
  nome,
  medida,
  peso,
  titulo,
  nota,
  onOrcamento,
}: CardModeloProps) => (
  <div className="flex flex-col group py-[20px] px-[20px] bg-white gap-[10px] rounded-md text-gray-950">
    {titulo && (
      <span className="font-display text-[13px] md:text-sm uppercase tracking-[0.06em] text-gray-950">
        {titulo}
      </span>
    )}

    {/* Header: medida + peso */}
    <div className="flex items-baseline justify-between gap-3 pb-2">
      <span className="text-sm md:text-[15px] font-semibold text-primary tracking-tight">{medida}</span>
      {(peso ?? nota) ? (
        <span className="text-[11px] md:text-xs text-[#7F7F7F] whitespace-nowrap">{peso ?? nota}</span>
      ) : null}
    </div>
    <div className="h-px bg-[#1E1E1E]/30" />

    {/* Imagem sem caixa */}
    <div className="h-44 md:h-52 flex items-center justify-center py-6">
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={nome}
          className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
        />
      ) : (
        <span className="text-[#9E9890] text-xs">{t("Imagem do produto")}</span>
      )}
    </div>

    {/* Link sutil */}
    <Link
      to="/orcamento"
      onClick={onOrcamento}
      className="self-start text-xs text-[#525252] hover:text-primary underline underline-offset-4 decoration-[#9E9890] transition-colors cursor-pointer"
    >
      {t("Solicitar orçamento")}
    </Link>
  </div>
);
