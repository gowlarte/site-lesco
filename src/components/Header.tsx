import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import logoDark from "@/assets/logo-lesco-dark-2.svg";
import logoLight from "@/assets/logo-lesco-light.svg";
import linhaEchotexRaw from "@/assets/linha-echotex-2.svg?raw";
import linhaItalflexRaw from "@/assets/linha-italflex-2.svg?raw";
import linhaZhuzenRaw from "@/assets/linha-zhuzen-2.svg?raw";

const lancamentos = [
  { label: "Echo", href: "/echo", svg: linhaEchotexRaw, svgClass: "[&_svg]:h-[18px]" },
  { label: "Geo", href: "/geo", svg: linhaItalflexRaw, svgClass: "[&_svg]:h-[17px] [&_svg]:-mb-[5px] [&_svg]:mt-[3px]" },
  { label: "Zhú", href: "/zhu", svg: linhaZhuzenRaw, svgClass: "[&_svg]:h-[18px]" },
];

type NavChild = { label: string; href: string };
type NavItem = { label: string; href?: string; children?: NavChild[]; external?: boolean };

const navLinks: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Sobre",
    children: [
      { label: "Quem somos", href: "/quem-somos" },
      { label: "Madeira WPC", href: "/madeira-ecologica-lesco" },
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
  { label: "Blog", href: "https://blog.lesco.com.br/", external: true },
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
        <div className="flex items-center h-14 px-6 lg:px-8 py-[40px] pb-[40px] gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={isLight ? logoDark : logoLight}
              alt="Lesco"
              className="w-[93px] h-[29px] object-contain transition-all duration-300 mt-[10px]"
            />
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-8 lg:gap-10 ml-auto"
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

              if (link.external) {
                return (
                  <a
                    key={link.href}
                    href={link.href!}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => {
                      setHoveredNav(link.label);
                      setOpenDropdown(null);
                    }}
                    className={sharedClass}
                    style={sharedStyle}
                  >
                    {link.label}
                  </a>
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
                  onClick={(e) => {
                    if (link.href === "/" && location.pathname === "/") {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className={sharedClass}
                  style={sharedStyle}
                >
                  {link.label}
                </Link>
              );
            })}
            {/* Desktop CTA (dentro do nav, após Portfólio) - estilo igual aos demais links */}
            {(() => {
              const emBreve = ["/zhu", "/echo", "/geo"].includes(location.pathname);
              const ctaLabel = emBreve ? "Lançamento em breve" : "Orçamento";
              const label = "Orçamento";
              const color =
                hoveredNav === label
                  ? activeColor
                  : hoveredNav !== null
                  ? dimColor
                  : baseColor;
              const linkClass =
                "font-display font-light text-[12px] uppercase tracking-[0.08em] transition-all duration-[350ms] flex items-center gap-1";
              const linkStyle = {
                color,
                filter: hoveredNav !== null && hoveredNav !== label ? "blur(0.5px)" : "blur(0px)",
              };
              return emBreve ? (
                <span className={linkClass} style={linkStyle}>{ctaLabel}</span>
              ) : (
                <Link
                  to="/orcamento"
                  onMouseEnter={() => {
                    setHoveredNav(label);
                    setOpenDropdown(null);
                  }}
                  className={linkClass}
                  style={linkStyle}
                >
                  {ctaLabel}
                </Link>
              );
            })()}

          </nav>

          {/* Separator */}
          <span
            className="hidden lg:block w-px h-4 self-center"
            style={{ backgroundColor: dimColor }}
            aria-hidden="true"
          />

          {/* Lançamentos pill */}
          <div
            className={cn(
              "hidden lg:flex items-center rounded-full border-0 transition-colors duration-300 gap-[25px] py-0 px-0"
            )}
            onMouseLeave={() => setHoveredNav(null)}
          >
            {lancamentos.map((l) => {
              const hovered = hoveredNav === `lanc-${l.label}`;
              const color = hovered
                ? activeColor
                : hoveredNav !== null
                ? dimColor
                : baseColor;
              return (
                <Link
                  key={l.href}
                  to={l.href}
                  onMouseEnter={() => setHoveredNav(`lanc-${l.label}`)}
                  className={cn(
                    "flex items-center transition-transform duration-300 hover:scale-105 [&_svg]:w-auto [&_svg]:fill-current [&_svg_*]:fill-current",
                    l.svgClass
                  )}
                  style={{ color }}
                  aria-label={l.label}
                  dangerouslySetInnerHTML={{ __html: l.svg }}
                />

              );
            })}
            <span
              className="font-display font-light text-[12px] uppercase tracking-[0.08em] whitespace-nowrap"
              style={{ color: baseColor }}
            >
              Lançamentos
            </span>
          </div>


          {/* Mobile Hamburger */}
          <button
            className={cn(
              "md:hidden ml-auto transition-colors duration-300",
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
              onClick={(e) => {
                if (link.href === "/" && location.pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="font-display text-3xl font-light text-foreground/80 hover:text-foreground transition-colors py-3"
            >
              {link.label}
            </Link>
          );
        })}

        {/* Lançamentos mobile */}
        <div className="mt-6 flex flex-col items-center gap-3 text-foreground/80">
          <span className="font-display font-light text-[11px] uppercase tracking-[0.12em] text-foreground/50">
            Lançamentos
          </span>
          <div className="flex items-center gap-6">
            {lancamentos.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                aria-label={l.label}
                className="flex items-center [&_svg]:h-6 [&_svg]:w-auto [&_svg]:fill-current [&_svg_*]:fill-current hover:text-foreground transition-colors"
                dangerouslySetInnerHTML={{ __html: l.svg }}
              />
            ))}
          </div>
        </div>



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
