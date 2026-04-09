import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import logoLight from "@/assets/logo-lesco-light.svg";

const navLinks = [
  { label: "Linhas", href: "/linhas" },
  { label: "Projetos", href: "/projetos" },
  { label: "Sobre", href: "/sobre" },
  { label: "Contato", href: "/contato" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-[rgba(10,9,8,0.92)] backdrop-blur-md"
            : "bg-transparent"
        )}
      >
        <div className="container mx-auto flex items-center justify-between h-20 px-6 lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logoLight} alt="Lesco" className="h-8" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "text-subheading text-xs text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-300",
                  location.pathname === link.href && "text-primary-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <Link
            to="/contato"
            className="hidden md:inline-flex items-center px-5 py-2.5 bg-accent text-accent-foreground text-xs font-body uppercase tracking-[0.1em] hover:bg-accent/90 transition-colors duration-300"
          >
            Falar com especialista
          </Link>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-primary-foreground"
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
            className="font-display text-4xl font-light text-primary-foreground/80 hover:text-primary-foreground transition-colors"
          >
            {link.label}
          </Link>
        ))}
        <Link
          to="/contato"
          className="mt-4 px-8 py-3 bg-accent text-accent-foreground font-body text-sm uppercase tracking-[0.1em]"
        >
          Falar com especialista
        </Link>
      </div>
    </>
  );
}
