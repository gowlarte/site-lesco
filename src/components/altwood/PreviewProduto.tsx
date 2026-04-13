import { Link } from "react-router-dom";
import { SwatchCor } from "./SwatchCor";
import { BotaoCTA } from "./BotaoCTA";
import { ImageIcon } from "lucide-react";

interface SwatchData {
  nome: string;
  corAproximada: string;
}

interface PreviewProdutoProps {
  id: string;
  tag: string;
  titulo: string;
  descricao: string;
  swatches: SwatchData[];
  href: string;
  imageSrc?: string;
}

export const PreviewProduto = ({ id, tag, titulo, descricao, swatches, href, imageSrc }: PreviewProdutoProps) => (
  <section id={id} className="py-24 border-b border-[#1E1E1E] last:border-b-0">
    <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-10 lg:gap-16 px-6 md:px-12 lg:px-20">
      {/* Left — Photo */}
      <div className="aspect-[3/2] rounded-[var(--aw-radius-card)] overflow-hidden">
        {imageSrc ? (
          <img src={imageSrc} alt={titulo} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-[#141414] flex items-center justify-center">
            <ImageIcon className="w-10 h-10 text-[#2A2A2A]" />
          </div>
        )}
      </div>

      {/* Right — Info */}
      <div className="flex flex-col justify-center gap-5">
        <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#C8956C]">{tag}</span>
        <h2 className="font-display text-3xl md:text-4xl lg:text-[44px] font-semibold text-white leading-tight">{titulo}</h2>
        <p className="text-[15px] text-[#7F7F7F] leading-relaxed max-w-md">{descricao}</p>
        <div className="flex gap-3 flex-wrap">
          {swatches.map((s) => (
            <SwatchCor key={s.nome} nome={s.nome} corAproximada={s.corAproximada} />
          ))}
        </div>
        <Link to={href}>
          <BotaoCTA variant="ghost">Ver linha completa</BotaoCTA>
        </Link>
      </div>
    </div>
  </section>
);
