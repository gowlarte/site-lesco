import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import logoDark from "@/assets/logo-lesco-dark-2.svg";
import logoLight from "@/assets/logo-lesco-light.svg";

type NavChild = { label: string; href: string };
type NavItem = { label: string; href?: string; children?: NavChild[] };

const navLinks: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Sobre",
    children: [
      { label: "Quem somos", href: "/quem-somos" },
      { label: "Madeira WPC", href: "/madeira-wpc" },
      { label: "Sustentabilidade", href: "/revestimento-sustentavel" },
    ],
  },
  {
    label: "Produtos",
    children: [
      { label: "Lesco Shield", href: "/madeira-ecologica-para-fachada" },
      { label: "Lesco Panel", href: "/placa-wpc-interior" },
      { label: "Lesco Brise", href: "/brise-madeira-ecologica" },
      { label: "Lesco Line", href: "/forro-wpc" },
      { label: "Lesco Deck", href: "/madeira-ecologica-para-deck" },
    ],
  },
  { label: "Catálogo", href: "/catalogo-lesco" },
  { label: "Biblioteca", href: "/biblioteca" },
  { label: "Blog", href: "/blog" },
  { label: "Portfólio", href: "/portfolio" },
];

interface HeaderProps {
  variant?: "default" | "overlay";
}

export function Header({ variant = "default" }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setOpenDropdown(null);
    setMobileExpanded(null);
  }, [location]);

  const isOverlay = variant === "overlay";
  const overlayTransparent = isOverlay && !scrolled;
  const isLight = !isOverlay && !scrolled;

  const baseColor = overlayTransparent ? "#FFFFFF" : isLight ? "#303030" : "#7F7F7F";
  const activeColor = overlayTransparent ? "#FFFFFF" : isLight ? "#000000" : "#FFFFFF";
  const dimColor = overlayTransparent ? "rgba(255,255,255,0.55)" : isLight ? "#A0A0A0" : "#525252";

  const isActive = (item: NavItem) => {
    if (item.href && location.pathname === item.href) return true;
    if (item.children?.some((c) => c.href === location.pathname)) return true;
    return false;
  };

  return (
    <>
      <header
        className={cn(
          "z-50 transition-all duration-[400ms] rounded-[10px]",
          overlayTransparent
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
            className="hidden md:flex items-center gap-8 lg:gap-10"
            onMouseLeave={() => {
              setHoveredNav(null);
              setOpenDropdown(null);
            }}
          >
            {navLinks.map((link) => {
              const color =
                hoveredNav === link.label
                  ? activeColor
                  : hoveredNav !== null
                  ? dimColor
                  : isActive(link)
                  ? activeColor
                  : baseColor;

              const sharedClass =
                "font-display font-light text-[12px] uppercase tracking-[0.08em] transition-all duration-[350ms] flex items-center gap-1";
              const sharedStyle = {
                color,
                filter: hoveredNav !== null && hoveredNav !== link.label ? "blur(0.5px)" : "blur(0px)",
              };

              if (link.children) {
                const isOpen = openDropdown === link.label;
                return (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => {
                      setHoveredNav(link.label);
                      setOpenDropdown(link.label);
                    }}
                  >
                    <button
                      type="button"
                      className={sharedClass}
                      style={sharedStyle}
                      aria-haspopup="true"
                      aria-expanded={isOpen}
                    >
                      {link.label}
                      <ChevronDown size={12} className={cn("transition-transform duration-200", isOpen && "rotate-180")} />
                    </button>

                    {isOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50">
                        <div
                          className={cn(
                            "min-w-[220px] rounded-[10px] py-2 shadow-2xl",
                            isLight ? "bg-[#e5e1dc] border border-dark/10" : "bg-[rgba(17,17,16,0.96)] backdrop-blur-xl"
                          )}
                        >
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              to={child.href}
                              className={cn(
                                "block px-5 py-2.5 font-display font-light text-[12px] uppercase tracking-[0.08em] transition-colors duration-200",
                                isLight
                                  ? "text-[#303030] hover:text-black hover:bg-black/5"
                                  : "text-white/70 hover:text-white hover:bg-white/5",
                                location.pathname === child.href && (isLight ? "text-black" : "text-white")
                              )}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  to={link.href!}
                  onMouseEnter={() => {
                    setHoveredNav(link.label);
                    setOpenDropdown(null);
                  }}
                  className={sharedClass}
                  style={sharedStyle}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          {(() => {
            const emBreve = ["/zhu", "/echo", "/geo"].includes(location.pathname);
            const ctaLabel = emBreve ? "Lançamento em breve" : "Orçamento";
            const ctaClass = "hidden md:inline-flex items-center px-4 py-1.5 rounded font-display font-light text-[12px] uppercase tracking-[0.08em] text-[#303030] bg-[#DBDBDB] hover:bg-[#cfcfcf] transition-all duration-300";
            return emBreve ? (
              <span className={cn(ctaClass, "cursor-default hover:bg-[#DBDBDB]")}>{ctaLabel}</span>
            ) : (
              <Link to="/orcamento" className={ctaClass}>{ctaLabel}</Link>
            );
          })()}

          {/* Mobile Hamburger */}
          <button
            className={cn(
              "md:hidden transition-colors duration-300",
              overlayTransparent ? "text-white" : isLight ? "text-[#303030]" : "text-foreground"
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
          "fixed inset-0 z-40 bg-primary flex flex-col items-center pt-28 pb-12 gap-2 overflow-y-auto transition-all duration-500",
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {navLinks.map((link) => {
          if (link.children) {
            const expanded = mobileExpanded === link.label;
            return (
              <div key={link.label} className="w-full max-w-md flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => setMobileExpanded(expanded ? null : link.label)}
                  className="font-display text-3xl font-light text-foreground/80 hover:text-foreground transition-colors flex items-center gap-2 py-3"
                >
                  {link.label}
                  <ChevronDown size={22} className={cn("transition-transform duration-200", expanded && "rotate-180")} />
                </button>
                {expanded && (
                  <div className="flex flex-col items-center gap-3 pb-2">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        className="font-body text-base font-light text-foreground/60 hover:text-foreground transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={link.href}
              to={link.href!}
              className="font-display text-3xl font-light text-foreground/80 hover:text-foreground transition-colors py-3"
            >
              {link.label}
            </Link>
          );
        })}

        {(() => {
          const emBreve = ["/zhu", "/echo", "/geo"].includes(location.pathname);
          const mobileClass = "mt-6 px-8 py-3 rounded text-white font-display text-sm uppercase tracking-[0.08em]";
          const mobileStyle = { background: "linear-gradient(135deg, #728ea0 25%, #c0c9bf 56%, #d6aa98 74%, #efdcc5 90%)" };
          return emBreve ? (
            <span className={mobileClass} style={mobileStyle}>Lançamento em breve</span>
          ) : (
            <Link to="/orcamento" className={mobileClass} style={mobileStyle}>Orçamento</Link>
          );
        })()}
      </div>
    </>
  );
}
