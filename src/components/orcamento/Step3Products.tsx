import { FormData } from "./types";
import { TIMELINE_OPTIONS, PRODUCT_OPTIONS } from "@/data/brazilian-states";

interface Step3Props {
  data: FormData;
  onChange: (field: keyof FormData, value: string | string[]) => void;
  errors: Record<string, string>;
}

const Step3Products = ({ data, onChange, errors }: Step3Props) => {
  const toggleProduct = (product: string) => {
    const current = data.products;
    const next = current.includes(product)
      ? current.filter((p) => p !== product)
      : [...current, product];
    onChange("products", next);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block font-display text-[11px] tracking-wider uppercase text-dark/80 mb-2 text-muted-foreground">
          Prazo do projeto *
        </label>
        <select
          value={data.timeline}
          onChange={(e) => onChange("timeline", e.target.value)}
          className={`w-full bg-white/60 border ${errors.timeline ? "border-red-400" : "border-dark/10"} rounded-[10px] px-4 py-3.5 font-body text-[15px] text-dark focus:outline-none focus:border-dark/30 transition-colors appearance-none`}
        >
          <option value="">Selecione o prazo</option>
          {TIMELINE_OPTIONS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        {errors.timeline && <p className="text-red-500 text-xs mt-1.5 font-body">{errors.timeline}</p>}
      </div>

      <div>
        <label className="block font-display text-[11px] tracking-wider uppercase text-dark/80 mb-3 text-muted-foreground">
          Produtos de interesse * <span className="normal-case text-dark/60">(selecione ao menos 1)</span>
        </label>
        <div className="space-y-3">
          {PRODUCT_OPTIONS.map((product) => {
            const isChecked = data.products.includes(product);
            return (
              <div
                key={product}
                onClick={() => toggleProduct(product)}
                className={`flex items-center gap-3 p-3.5 rounded-[10px] border cursor-pointer transition-all ${
                  isChecked
                    ? "border-dark/30 bg-dark/5"
                    : "border-dark/10 bg-white/60 hover:border-dark/20"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                    isChecked ? "bg-dark border-dark" : "border-dark/20"
                  }`}
                >
                  {isChecked && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span className="font-body text-[15px] text-dark">{product}</span>
              </div>
            );
          })}
        </div>
        {errors.products && <p className="text-red-500 text-xs mt-1.5 font-body">{errors.products}</p>}
      </div>
    </div>
  );
};

export default Step3Products;
