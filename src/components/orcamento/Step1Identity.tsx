import { FormData } from "./types";

interface Step1Props {
  data: FormData;
  onChange: (field: keyof FormData, value: string) => void;
  errors: Record<string, string>;
}

const formatPhone = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

const Step1Identity = ({ data, onChange, errors }: Step1Props) => {
  const handlePhoneChange = (value: string) => {
    onChange("phone", formatPhone(value));
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block font-display text-[11px] tracking-wider uppercase text-dark/80 mb-2 text-muted-foreground">
          Nome completo *
        </label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => onChange("name", e.target.value)}
          placeholder="Seu nome"
          className={`w-full bg-white/60 border ${errors.name ? "border-red-400" : "border-dark/10"} rounded-[10px] px-4 py-3.5 font-body text-[15px] text-dark placeholder:text-dark/50 focus:outline-none focus:border-dark/30 transition-colors`}
        />
        {errors.name && <p className="text-red-500 text-xs mt-1.5 font-body">{errors.name}</p>}
      </div>

      <div>
        <label className="block font-display text-[11px] tracking-wider uppercase text-dark/80 mb-2 text-muted-foreground">
          Email *
        </label>
        <input
          type="email"
          value={data.email}
          onChange={(e) => onChange("email", e.target.value)}
          placeholder="seu@email.com"
          className={`w-full bg-white/60 border ${errors.email ? "border-red-400" : "border-dark/10"} rounded-[10px] px-4 py-3.5 font-body text-[15px] text-dark placeholder:text-dark/50 focus:outline-none focus:border-dark/30 transition-colors`}
        />
        {errors.email && <p className="text-red-500 text-xs mt-1.5 font-body">{errors.email}</p>}
      </div>

      <div>
        <label className="block font-display text-[11px] tracking-wider uppercase text-dark/80 mb-2 text-muted-foreground">
          Telefone *
        </label>
        <input
          type="tel"
          value={data.phone}
          onChange={(e) => handlePhoneChange(e.target.value)}
          placeholder="(11) 91234-5678"
          className={`w-full bg-white/60 border ${errors.phone ? "border-red-400" : "border-dark/10"} rounded-[10px] px-4 py-3.5 font-body text-[15px] text-dark placeholder:text-dark/50 focus:outline-none focus:border-dark/30 transition-colors`}
        />
        {errors.phone && <p className="text-red-500 text-xs mt-1.5 font-body">{errors.phone}</p>}
      </div>
    </div>
  );
};

export default Step1Identity;
