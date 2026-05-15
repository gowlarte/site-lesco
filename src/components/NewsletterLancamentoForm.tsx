import { useState } from "react";
import { Loader2, Mail } from "lucide-react";

const TOKEN_RDSTATION = "76788d5f5db5b8865e702fbe1fa5d416";
const CONVERSION_URL = "https://cta-redirect.rdstation.com/v2/conversions";

const validateEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

interface Props {
  slug: string;
  nomeLinha: string;
  variant?: "light" | "dark";
}

export const NewsletterLancamentoForm = ({ slug, nomeLinha, variant = "light" }: Props) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Email inválido");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const body = new URLSearchParams();
      body.append("token_rdstation", TOKEN_RDSTATION);
      body.append("conversion_identifier", `lancamento-${slug}`);
      body.append("email", email);
      body.append("cf_url_conversao", window.location.href);
      body.append("cf_linha_interesse", nomeLinha);
      await fetch(CONVERSION_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
    } catch (err) {
      console.error("[RDStation] Newsletter submit error", err);
    }
    setLoading(false);
    setSuccess(true);
  };

  const isDark = variant === "dark";
  const inputBg = isDark ? "bg-white/10 text-white placeholder:text-white/50 border-white/20 focus:border-white/60" : "bg-white/80 text-dark placeholder:text-dark/50 border-dark/15 focus:border-dark/40";
  const btnCls = isDark ? "bg-white text-dark" : "bg-dark text-light";
  const successBg = isDark ? "border-white/20 bg-white/10" : "border-dark/15 bg-white/40";
  const successTextStrong = isDark ? "text-white" : "text-dark";
  const successTextSoft = isDark ? "text-white/70" : "text-dark/60";

  if (success) {
    return (
      <div className={`border ${successBg} rounded-[10px] p-6 text-center`}>
        <Mail className={`w-8 h-8 mx-auto mb-3 ${successTextSoft}`} strokeWidth={1.2} />
        <p className={`font-display text-lg mb-1 ${successTextStrong}`}>Tudo certo!</p>
        <p className={`font-body text-sm ${successTextSoft}`}>
          Avisaremos você assim que {nomeLinha} estiver disponível.
        </p>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError("");
          }}
          placeholder="seu@email.com"
          className={`flex-1 border ${error ? "border-red-400" : ""} ${inputBg} rounded-[10px] px-4 py-3.5 font-body text-[15px] focus:outline-none transition-colors`}
        />
        <button
          type="submit"
          disabled={loading}
          className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[10px] ${btnCls} font-display text-sm uppercase tracking-wider hover:opacity-90 transition-opacity disabled:opacity-60`}
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Notifique-me"}
        </button>
      </form>
      {error && <p className="text-red-400 text-xs mt-2 font-body">{error}</p>}
    </div>
  );
};
