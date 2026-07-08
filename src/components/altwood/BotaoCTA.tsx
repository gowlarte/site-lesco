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
  const base = "inline-flex items-center justify-center font-semibold transition-all cursor-pointer";
  const styles = {
    primary: "bg-[#d5b89f] text-primary px-6 py-3 rounded-[var(--aw-radius-btn)] hover:brightness-[0.92]",
    secondary: "border border-[#C8956C] text-[#C8956C] px-6 py-3 rounded-[var(--aw-radius-btn)] bg-transparent hover:bg-[rgba(200,149,108,0.08)]",
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
