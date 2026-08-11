import { PaginaFamiliaZhu } from "@/components/zhu/PaginaFamiliaZhu";
import { familiasZhu } from "@/data/zhu";

/** Zhú — Painéis Acústicos (9 modelos). Conteúdo em src/data/zhu.ts. */
const ZhuAcusticos = () => <PaginaFamiliaZhu familia={familiasZhu.acusticos} />;

export default ZhuAcusticos;
