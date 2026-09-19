import { ArrowUpRight } from "lucide-react";
import { Link } from "@/components/AppLink";
import { projetosPorTipo, type TipoProduto } from "@/data/projetos";
import { t } from "@/i18n/t";

/**
 * Obras do portfólio que usaram este tipo de produto.
 *
 * Substitui a galeria de fotos anônimas que as páginas de produto traziam: o
 * card agora tem nome, cidade, ano e leva para o case em /projetos/:slug — a
 * mesma foto passa a ser prova de obra entregue, e não só ilustração.
 *
 * A seção inteira some quando não há obra cadastrada para o tipo (ver
 * `projetosPorTipo`). É o estado de Line, Muxarabi e das famílias da Zhú
 * enquanto as fotos de aplicação não chegam — melhor nada do que um título
 * "Realizações" com a grade vazia embaixo.
 */

/** "Xangri-Lá, RS · 2024" — o traço em `ano` marca projeto sem data fechada. */
function legenda(local: string, ano: string) {
  return [local, ano && ano !== "—" ? ano : null].filter(Boolean).join(" · ");
}

interface Props {
  tipo: TipoProduto;
  /** Nome comercial da linha, para o título. Ex.: "Lesco Brise". */
  linha: string;
}

export const ProjetosDoProduto = ({ tipo, linha }: Props) => {
  const obras = projetosPorTipo(tipo);
  if (!obras.length) return null;

  return (
    <div className="px-6 md:px-12 lg:px-20 py-24">
      <span className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-accent-ink mb-3">
        {t("Projetos")}
      </span>
      <h2 className="font-display text-3xl md:text-4xl font-semibold mb-10 text-gray-950">
        {t("Realizações com")} {linha}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {obras.map((obra) => (
          <Link
            key={obra.slug}
            to={`/projetos/${obra.slug}`}
            className="group relative aspect-[4/3] rounded-[var(--aw-radius-card)] overflow-hidden"
          >
            <img
              src={obra.imagem}
              alt={obra.nome}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
            {/* O degradê é permanente, não só no hover: o nome da obra é a
                razão de o card existir, e no toque não há hover para revelar. */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent pt-16 px-5 pb-5">
              <p className="font-body text-[11px] font-light uppercase tracking-[0.12em] text-white/70">
                {legenda(obra.local, obra.ano)}
              </p>
              <p className="mt-1.5 flex items-center gap-1.5 font-display text-[19px] leading-tight text-white">
                {obra.nome}
                <ArrowUpRight
                  size={16}
                  className="shrink-0 opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                />
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
