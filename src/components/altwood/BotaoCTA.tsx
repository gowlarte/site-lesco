import { cn } from "@/lib/utils";
import { localizePath } from "@/i18n/routes";

interface BotaoCTAProps {
  variant?: "primary" | "secondary" | "ghost";
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  href?: string;
}

export const BotaoCTA = ({ variant = "primary", children, onClick, className, href }: BotaoCTAProps) => {
  const base = "inline-flex items-center justify-center font-medium transition-all cursor-pointer";
  const styles = {
    primary: "bg-[#d5b89f] text-primary px-6 py-3 rounded-[var(--aw-radius-btn)] hover:brightness-[0.92]",
    // `secondary` só existe sobre a foto do hero (ver HeroSection). Era âmbar
    // sobre foto escurecida a 60%, o que dá 2,32:1 no pior caso, um pixel de
    // céu estourado. Branco no mesmo lugar fecha 6,09:1, e a borda a 70% fica
    // em 3,95:1, acima dos 3:1 que elemento de interface pede.
    secondary: "border border-white/70 text-white px-6 py-3 rounded-[var(--aw-radius-btn)] bg-transparent hover:bg-white/10",
    ghost: "text-primary bg-transparent border-none gap-1 text-left justify-start",
  };

  const cls = cn(base, styles[variant], className);

  if (href) {
    return <a href={localizePath(href)} className={cls} onClick={onClick}>{children}{variant === "ghost" && <span>→</span>}</a>;
  }

  return (
    <button className={cls} onClick={onClick}>
      {children}
      {variant === "ghost" && <span>→</span>}
    </button>
  );
};
