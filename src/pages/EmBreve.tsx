import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Loader2, Mail, ArrowLeft } from "lucide-react";

const TOKEN_RDSTATION = "76788d5f5db5b8865e702fbe1fa5d416";
const CONVERSION_URL = "https://cta-redirect.rdstation.com/v2/conversions";

const linhasInfo: Record<string, { nome: string; descricao: string }> = {
  zhuzen: { nome: "Zhúzen", descricao: "Revestimentos, forros e decorativos em bambu." },
  echotex: { nome: "Echotex", descricao: "Tecido acústico moldado para estúdios e home cinemas." },
  italflex: { nome: "Italflex", descricao: "Revestimento flexível para fachadas e ambientes internos." },
  geo: { nome: "Geo", descricao: "Em breve." },
};

const validateEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

const EmBreve = () => {
  const { linha } = useParams<{ linha: string }>();
  const info = linhasInfo[linha ?? ""] ?? { nome: "Esta linha", descricao: "" };

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
      body.append("conversion_identifier", `lancamento-${linha}`);
      body.append("email", email);
      body.append("cf_url_conversao", window.location.href);
      body.append("cf_linha_interesse", info.nome);
      await fetch(CONVERSION_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
    } catch (err) {
      console.error("[RDStation] EmBreve submit error", err);
    }
    setLoading(false);
    setSuccess(true);
  };

  return (
    <main className="min-h-screen pt-[100px] pb-[10px] px-[10px]">
      <section className="bg-light rounded-[10px] min-h-[calc(100vh-120px)] flex items-center justify-center px-6 py-20">
        <div className="max-w-[560px] w-full text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-dark/50 mb-6">
            {info.nome}
          </p>
          <h1 className="font-display font-light text-[40px] md:text-[56px] leading-[1.05] tracking-[-0.02em] text-dark mb-5">
            Em breve.
          </h1>
          <p className="font-body text-[16px] md:text-[17px] text-dark/70 leading-relaxed mb-10">
            Página em construção. Preencha seu e-mail e seja notificado quando lançarmos esta linha.
          </p>

          {success ? (
            <div className="border border-dark/15 rounded-[10px] p-6 bg-white/40">
              <Mail className="w-8 h-8 mx-auto mb-3 text-dark/70" strokeWidth={1.2} />
              <p className="font-display text-lg text-dark mb-1">Tudo certo!</p>
              <p className="font-body text-sm text-dark/60">
                Avisaremos você assim que {info.nome} estiver disponível.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                placeholder="seu@email.com"
                className={`flex-1 bg-white/60 border ${error ? "border-red-400" : "border-dark/15"} rounded-[10px] px-4 py-3.5 font-body text-[15px] text-dark placeholder:text-dark/50 focus:outline-none focus:border-dark/40 transition-colors`}
              />
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[10px] bg-dark text-light font-display text-sm uppercase tracking-wider hover:opacity-90 transition-opacity disabled:opacity-60"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Notifique-me"}
              </button>
            </form>
          )}
          {error && <p className="text-red-500 text-xs mt-2 font-body text-left">{error}</p>}

          <Link
            to="/linhas"
            className="inline-flex items-center gap-2 mt-12 font-display text-[12px] uppercase tracking-[0.08em] text-dark/60 hover:text-dark transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Voltar para linhas
          </Link>
        </div>
      </section>
    </main>
  );
};

export default EmBreve;
