import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import logoDark from "@/assets/logo-lesco-dark-2.svg";
import logoLight from "@/assets/logo-lesco-light.svg";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Sobre Nós", href: "/sobre" },
  { label: "Linhas", href: "/linhas" },
  { label: "Catálogo", href: "/catalogo" },
  { label: "Blog", href: "/blog" },
];

interface HeaderProps {
  variant?: "default" | "overlay";
}

export function Header({ variant = "default" }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const isOverlay = variant === "overlay";
  // overlay variant: always light text/logo, transparent bg, absolute (not fixed).
  // default: dynamic on scroll.
  const isLight = !isOverlay && !scrolled;

  return (
    <>
      <header
        className={cn(
          "z-50 transition-all duration-[400ms] rounded-[10px]",
          isOverlay
            ? "absolute top-0 left-0 right-0 bg-transparent"
            : cn(
                "fixed top-[10px] left-[10px] right-[10px]",
                isLight ? "bg-[#e5e1dc]" : "bg-[rgba(17,17,16,0.92)] backdrop-blur-xl"
              )
        )}
      >
        <div className="flex items-center justify-between h-14 px-6 lg:px-8 mt-[20px]">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={isLight ? logoDark : logoLight}
              alt="Lesco"
              className="w-[93px] h-[29px] object-contain transition-all duration-300"
            />
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-10"
            onMouseLeave={() => setHoveredNav(null)}
          >
            {navLinks.map((link) => {
              const baseColor = isOverlay ? "#FFFFFF" : isLight ? "#303030" : "#7F7F7F";
              const activeColor = isOverlay ? "#FFFFFF" : isLight ? "#000000" : "#FFFFFF";
              const dimColor = isOverlay ? "rgba(255,255,255,0.55)" : isLight ? "#A0A0A0" : "#525252";

              return (
                <Link
                  key={link.href}
                  to={link.href}
                  onMouseEnter={() => setHoveredNav(link.href)}
                  className="font-display font-light text-[12px] uppercase tracking-[0.08em] transition-all duration-[350ms]"
                  style={{
                    color:
                      hoveredNav === link.href
                        ? activeColor
                        : hoveredNav !== null
                        ? dimColor
                        : location.pathname === link.href
                        ? activeColor
                        : baseColor,
                    filter:
                      hoveredNav !== null && hoveredNav !== link.href
                        ? "blur(0.5px)"
                        : "blur(0px)",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA — gradient matching brand logo */}
          <Link
            to="/orcamento"
            className="hidden md:inline-flex items-center px-4 py-1.5 rounded font-display font-light text-[12px] uppercase tracking-[0.08em] text-[#303030] bg-[#DBDBDB] hover:bg-[#cfcfcf] transition-all duration-300"
          >
            Orçamento
          </Link>

          {/* Mobile Hamburger */}
          <button
            className={cn(
              "md:hidden transition-colors duration-300",
              isOverlay ? "text-white" : isLight ? "text-[#303030]" : "text-foreground"
            )}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Fullscreen */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-primary flex flex-col items-center justify-center gap-8 transition-all duration-500",
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className="font-display text-4xl font-light text-foreground/80 hover:text-foreground transition-colors"
          >
            {link.label}
          </Link>
        ))}
        <Link
          to="/orcamento"
          className="mt-4 px-8 py-3 rounded text-white font-display text-sm uppercase tracking-[0.08em]"
          style={{
            background: "linear-gradient(135deg, #728ea0 25%, #c0c9bf 56%, #d6aa98 74%, #efdcc5 90%)",
          }}
        >
          Orçamento
        </Link>
      </div>
    </>
  );
}
