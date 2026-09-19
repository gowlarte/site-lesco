import { cn } from "@/lib/utils";

const tabs = [
  { id: "brise", label: "Brise" },
  { id: "shield", label: "Shield" },
  { id: "deck", label: "Deck" },
  { id: "line", label: "Line" },
  { id: "panel", label: "Panel" },
];

interface FiltroProdutosProps {
  activeId: string;
  onTabClick: (id: string) => void;
}

/**
 * A barra é uma superfície ESCURA no meio de uma página clara, e é por isso
 * que as cores aqui continuam sendo as do tema escuro: sobre #181817 elas
 * passam. O que estava fora da régua era só o cinza dos itens inativos, em
 * 4,44:1; subiu para #8A8A8A, que fecha 5,15:1.
 *
 * A pergunta de se essa barra deveria ser escura é de composição, não de
 * contraste, e fica para o lote de recomposição.
 */
export const FiltroProdutos = ({ activeId, onTabClick }: FiltroProdutosProps) => (
  <nav
    id="filtro"
    className="relative bg-[#0D0D0D]/95 backdrop-blur-xl border-b border-[#1E1E1E] overflow-x-auto"
  >
    <div className="flex items-center h-14 px-6 md:px-12 gap-1 whitespace-nowrap">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabClick(tab.id)}
          className={cn(
            "px-4 py-2 text-[13px] font-medium uppercase tracking-[0.06em] transition-all duration-300 border-b-2 cursor-pointer",
            activeId === tab.id
              ? "text-[#C8956C] border-[#C8956C]"
              : "text-[#8A8A8A] border-transparent hover:text-white"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  </nav>
);
