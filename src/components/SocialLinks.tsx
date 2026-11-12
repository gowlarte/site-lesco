import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { cn } from "@/lib/utils";

const TikTok = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16.6 5.82a4.28 4.28 0 0 1-1.06-2.82h-3.13v12.43a2.4 2.4 0 1 1-1.7-2.3V9.9a5.53 5.53 0 1 0 4.83 5.48V9.01a7.36 7.36 0 0 0 4.31 1.38V7.26a4.28 4.28 0 0 1-3.25-1.44Z" />
  </svg>
);

/** Perfis oficiais da Lesco. */
export const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/lesco_br/", Icon: Instagram },
  { label: "Facebook", href: "https://www.facebook.com/lescorevestimentosbr/", Icon: Facebook },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/lescorevestimentos/home/", Icon: Linkedin },
  { label: "YouTube", href: "https://www.youtube.com/@LescoBR", Icon: Youtube },
  { label: "TikTok", href: "https://www.tiktok.com/@lescorevestimentos", Icon: TikTok },
] as const;

export function SocialLinks({ className, linkClassName }: { className?: string; linkClassName?: string }) {
  return (
    <ul className={cn("flex items-center gap-1", className)}>
      {SOCIALS.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className={cn("flex h-10 w-10 items-center justify-center rounded-full transition-colors", linkClassName)}
          >
            <Icon className="h-[18px] w-[18px]" />
          </a>
        </li>
      ))}
    </ul>
  );
}
