import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import logoDark from "@/assets/logo-lesco-dark-2.svg";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Sobre Nós", href: "/sobre" },
  { label: "Linhas", href: "/linhas" },
  { label: "Catálogo", href: "/catalogo" },
];

export function Header() {
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

  return (
    <>
      <header
        className={cn(
          "fixed top-[10px] left-[10px] right-[10px] z-50 transition-all duration-[400ms] rounded-[10px]",
          "bg-[rgba(17,17,16,0.92)] backdrop-blur-xl"
        )}
      >
        <div className="container mx-auto flex items-center justify-between h-20 px-6 lg:px-8 my-0">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logoDark} alt="Lesco" className="w-[93px] h-[29px] object-contain" />
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-10"
            onMouseLeave={() => setHoveredNav(null)}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onMouseEnter={() => setHoveredNav(link.href)}
                className="font-display font-light text-[12px] uppercase tracking-[0.08em] transition-all duration-[350ms]"
                style={{
                  color:
                    hoveredNav === link.href
                      ? "#FFFFFF"
                      : hoveredNav !== null
                      ? "#525252"
                      : location.pathname === link.href
                      ? "#FFFFFF"
                      : "#7F7F7F",
                  filter:
                    hoveredNav !== null && hoveredNav !== link.href
                      ? "blur(0.5px)"
                      : "blur(0px)",
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <Link
            to="/orcamento"
            className="hidden md:inline-flex items-center px-4 py-2 rounded bg-[#F57D69] text-white font-display font-light text-[12px] uppercase tracking-[0.08em] hover:brightness-90 transition-all duration-300"
          >
            Orçamento
          </Link>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
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
          className="mt-4 px-8 py-3 rounded bg-[#F57D69] text-white font-display text-sm uppercase tracking-[0.08em]"
        >
          Orçamento
        </Link>
      </div>
    </>
  );
}
