import { useState } from "react";
import { Loader2, Download } from "lucide-react";

const CATALOG_URL = "/catalogo.pdf";
const TOKEN_RDSTATION = "76788d5f5db5b8865e702fbe1fa5d416";
const CONVERSION_IDENTIFIER = "download-catalogo-site";
const CONVERSION_URL = "https://cta-redirect.rdstation.com/v2/conversions";

const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePhone = (phone: string) => phone.replace(/\D/g, "").length >= 10;

const formatPhone = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

interface FormState {
  name: string;
  email: string;
  phone: string;
  company: string;
}

const initial: FormState = { name: "", email: "", phone: "", company: "" };

const submitToRD = async (data: FormState) => {
  try {
    const body = new URLSearchParams();
    body.append("token_rdstation", TOKEN_RDSTATION);
    body.append("conversion_identifier", CONVERSION_IDENTIFIER);
    body.append("name", data.name);
    body.append("email", data.email);
    body.append("personal_phone", `+55 ${data.phone}`);
    if (data.company) body.append("company_name", data.company);
    body.append("cf_url_conversao", window.location.href);
    body.append("cf_user_agent_lead", navigator.userAgent);
    body.append("privacy_data[browser]", navigator.userAgent);

    await fetch(CONVERSION_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });
    return true;
  } catch (e) {
    console.error("[RDStation] Catálogo submit error", e);
    return false;
  }
};

const triggerDownload = () => {
  const link = document.createElement("a");
  link.href = CATALOG_URL;
  link.download = "catalogo-lesco.pdf";
  link.target = "_blank";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const CatalogoForm = () => {
  const [data, setData] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const update = (field: keyof FormState, value: string) => {
    setData((p) => ({ ...p, [field]: value }));
    if (errors[field]) {
      setErrors((p) => {
        const n = { ...p };
        delete n[field];
        return n;
      });
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!data.name.trim()) errs.name = "Nome é obrigatório";
    if (!data.email.trim()) errs.email = "Email é obrigatório";
    else if (!validateEmail(data.email)) errs.email = "Email inválido";
    if (!data.phone.trim()) errs.phone = "Telefone é obrigatório";
    else if (!validatePhone(data.phone)) errs.phone = "Telefone inválido";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    await submitToRD(data);
    setIsSubmitting(false);
    setIsSuccess(true);
    setTimeout(triggerDownload, 600);
  };

  if (isSuccess) {
    const firstName = data.name.split(" ")[0];
    return (
      <div className="text-center py-12">
        <div className="flex justify-center mb-6">
          <Download className="w-16 h-16 text-dark/80" strokeWidth={1.2} />
        </div>
        <h2 className="font-display text-2xl md:text-3xl font-semibold text-dark mb-3">
          Obrigado, {firstName}!
        </h2>
        <p className="font-body text-[15px] text-dark/70 leading-relaxed max-w-[420px] mx-auto mb-6">
          Seu download deve começar em instantes. Caso não inicie automaticamente, clique no botão abaixo.
        </p>
        <button
          onClick={triggerDownload}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] bg-dark text-light font-display text-sm uppercase tracking-wider hover:opacity-90 transition-opacity"
        >
          <Download className="w-4 h-4" />
          Baixar catálogo
        </button>
      </div>
    );
  }

  const inputCls = (err?: string) =>
    `w-full bg-white/60 border ${err ? "border-red-400" : "border-dark/10"} rounded-[10px] px-4 py-3.5 font-body text-[15px] text-dark placeholder:text-dark/50 focus:outline-none focus:border-dark/30 transition-colors`;
  const labelCls =
    "block font-display text-[11px] tracking-wider uppercase text-dark/80 mb-2 text-muted-foreground";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className={labelCls}>Nome completo *</label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => update("name", e.target.value)}
          placeholder="Seu nome"
          className={inputCls(errors.name)}
        />
        {errors.name && <p className="text-red-500 text-xs mt-1.5 font-body">{errors.name}</p>}
      </div>

      <div>
        <label className={labelCls}>Email *</label>
        <input
          type="email"
          value={data.email}
          onChange={(e) => update("email", e.target.value)}
          placeholder="seu@email.com"
          className={inputCls(errors.email)}
        />
        {errors.email && <p className="text-red-500 text-xs mt-1.5 font-body">{errors.email}</p>}
      </div>

      <div>
        <label className={labelCls}>Telefone *</label>
        <input
          type="tel"
          value={data.phone}
          onChange={(e) => update("phone", formatPhone(e.target.value))}
          placeholder="(11) 91234-5678"
          className={inputCls(errors.phone)}
        />
        {errors.phone && <p className="text-red-500 text-xs mt-1.5 font-body">{errors.phone}</p>}
      </div>

      <div>
        <label className={labelCls}>Empresa</label>
        <input
          type="text"
          value={data.company}
          onChange={(e) => update("company", e.target.value)}
          placeholder="Nome da empresa (opcional)"
          className={inputCls()}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-[10px] bg-dark text-light font-display text-sm uppercase tracking-wider hover:opacity-90 transition-opacity disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            <Download className="w-4 h-4" />
            Baixar catálogo
          </>
        )}
      </button>

      <p className="font-body text-xs text-dark/50 text-center">
        Ao enviar, você concorda em receber comunicações da Lesco.
      </p>
    </form>
  );
};

export default CatalogoForm;
