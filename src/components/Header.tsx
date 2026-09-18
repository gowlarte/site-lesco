import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "@/components/AppLink";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { rolarPara } from "@/lib/scroll-suave";
import { useSaiuDoHero } from "@/hooks/useSaiuDoHero";
import { t } from "@/i18n/t";
import { isEN } from "@/i18n/locale";
import logoDark from "@/assets/logo-lesco-dark-2.svg";
import logoLight from "@/assets/logo-lesco-light.svg";

/**
 * Navegação por MATERIAL no primeiro nível e por TIPO DE PRODUTO no segundo.
 *
 * O rótulo visível é sempre o tipo ("Brises", "Forros"), porque é o vocabulário
 * que o arquiteto já usa. O nome comercial da linha ("Lesco Brise", "Zhú") vem
 * como `linha` e é renderizado como tag secundária à direita — apoio, não
 * protagonista, já que as linhas foram lançadas recentemente e a nomenclatura
 * ainda não é reconhecida pelo público.
 */
type NavChild = { label: string; href: string; linha?: string };
type NavItem = { label: string; href?: string; children?: NavChild[]; external?: boolean };

const navLinks: NavItem[] = [
  {
    label: t("Madeira ecológica"),
    children: [
      { label: t("Brises"), href: "/brise-madeira-ecologica", linha: "Lesco Brise" },
      { label: t("Forros"), href: "/forro-wpc", linha: "Lesco Line" },
      { label: t("Decks"), href: "/madeira-ecologica-para-deck", linha: "Lesco Deck" },
      { label: t("Shields"), href: "/madeira-ecologica-para-fachada", linha: "Lesco Shield" },
      { label: t("Panels"), href: "/placa-wpc-interior", linha: "Lesco Panel" },
      { label: t("Muxarabi"), href: "/muxarabi-madeira-ecologica", linha: "Lesco Muxarabi" },
    ],
  },
  {
    label: t("Bambu"),
    children: [
      { label: t("Painéis e forros"), href: "/painel-bambu", linha: "Zhú" },
      { label: t("Painéis acústicos"), href: "/painel-acustico-bambu", linha: "Zhú" },
      { label: t("Brises"), href: "/brise-bambu", linha: "Zhú" },
      { label: t("Decks"), href: "/deck-bambu", linha: "Zhú" },
    ],
  },
  { label: t("Pedra flexível"), href: "/geo" },
  { label: t("Catálogo"), href: "/catalogo-lesco" },
  { label: t("Biblioteca"), href: "/biblioteca" },
  { label: "Blog", href: "https://blog.lesco.com.br/", external: true },
  { label: t("Portfólio"), href: "/portfolio" },
  // Blog é do site PT (blog.lesco.com.br); ocultar no build EN por ora.
].filter((link) => !(isEN && link.href?.includes("blog.lesco")));

interface HeaderProps {
  variant?: "default" | "overlay";
}

export function Header({ variant = "default" }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const location = useLocation();

  const isOverlay = variant === "overlay";

  // Fora da home basta a distância: passados 60px o cabeçalho já não está
  // mais sobre o topo da página e pede fundo. Na home ele é transparente sobre
  // o hero, e quem sabe dizer quando o hero acabou é o hook.
  const saiuDoHero = useSaiuDoHero();
  const [rolou, setRolou] = useState(false);

  useEffect(() => {
    const sincronizar = () => setRolou(window.scrollY > 60);
    sincronizar(); // um F5 no meio da página já começa rolado
    window.addEventListener("scroll", sincronizar, { passive: true });
    return () => window.removeEventListener("scroll", sincronizar);
  }, []);

  const scrolled = isOverlay ? saiuDoHero : rolou;

  useEffect(() => {
    setMenuOpen(false);
    setOpenDropdown(null);
    setMobileExpanded(null);
  }, [location]);

  const overlayTransparent = isOverlay && !scrolled;
  const isLight = !isOverlay && !scrolled;

  const baseColor = overlayTransparent ? "#FFFFFF" : isLight ? "#303030" : "#7F7F7F";
  const activeColor = overlayTransparent ? "#FFFFFF" : isLight ? "#000000" : "#FFFFFF";
  const dimColor = overlayTransparent ? "rgba(255,255,255,0.55)" : isLight ? "#A0A0A0" : "#525252";

  // Filhos podem carregar âncora (ex. "/zhu#forro"); comparar só o pathname.
  const pathOf = (href: string) => href.split("#")[0];

  const isActive = (item: NavItem) => {
    if (item.href && location.pathname === item.href) return true;
    if (item.children?.some((c) => pathOf(c.href) === location.pathname)) return true;
    return false;
  };

  return (
    <>
      <header
        className={cn(
          // A posição não muda com o scroll: só a cor. `fixed` sempre, inclusive
          // no estado transparente da home — lá o topo da página coincide com o
          // topo do palco do hero (ambos a 10px), então não há diferença visual,
          // e some o risco de o cabeçalho depender de onde ele está na árvore.
          "fixed top-[10px] left-[10px] right-[10px] z-50",
          "transition-all duration-[400ms] rounded-[10px]",
          overlayTransparent
            ? "bg-transparent"
            : isLight
              ? "bg-[#e5e1dc]"
              : "bg-[rgba(17,17,16,0.92)] backdrop-blur-xl"
        )}
      >
        <div className="flex items-center h-14 px-6 lg:px-8 py-[40px] pb-[40px] gap-6">
          {/* Logo — `shrink-0` é obrigatório: a linha é um flex único e, sem
              isso, é a logo (e não o menu) que absorve a compressão quando o
              nav não cabe, chegando a sumir por completo. */}
          <Link
            to="/"
            className="flex items-center shrink-0"
            onClick={(e) => {
              // Estando já na home o React Router não troca de rota, então nem
              // o ScrollToTop nem o efeito de [location] rodam: subir ao topo e
              // fechar o menu ficam por conta daqui.
              if (location.pathname === "/") {
                e.preventDefault();
                rolarPara(0, true);
              }
              setMenuOpen(false);
            }}
          >
            <img
              src={isLight ? logoDark : logoLight}
              alt="Lesco"
              className="w-[93px] h-[29px] object-contain transition-all duration-300 mt-[10px]"
            />
          </Link>

          {/* Desktop Nav — o nav completo pede ~1145px (7 itens + CTA + logo +
              paddings). Ligar em `md` (768px) espremia a logo; abaixo de `xl`
              usamos o hambúrguer, que já contém os mesmos links. */}
          <nav
            className="hidden xl:flex items-center gap-8 2xl:gap-10 ml-auto"
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
                            "min-w-[280px] rounded-[10px] py-2 shadow-2xl",
                            isLight ? "bg-[#e5e1dc] border border-dark/10" : "bg-[rgba(17,17,16,0.96)] backdrop-blur-xl"
                          )}
                        >
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              to={child.href}
                              className={cn(
                                "flex items-center justify-between gap-8 px-5 py-2.5 transition-colors duration-200",
                                isLight
                                  ? "text-[#303030] hover:text-black hover:bg-black/5"
                                  : "text-white/70 hover:text-white hover:bg-white/5",
                                location.pathname === pathOf(child.href) && (isLight ? "text-black" : "text-white")
                              )}
                            >
                              <span className="font-display font-light text-[12px] uppercase tracking-[0.08em]">
                                {child.label}
                              </span>
                              {child.linha && (
                                <span
                                  className={cn(
                                    "font-body text-[10px] font-light tracking-normal whitespace-nowrap",
                                    isLight ? "text-[#303030]/45" : "text-white/35"
                                  )}
                                >
                                  {child.linha}
                                </span>
                              )}
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
                      rolarPara(0, true);
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
              const label = t("Orçamento");
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
              return (
                <Link
                  to="/orcamento"
                  onMouseEnter={() => {
                    setHoveredNav(label);
                    setOpenDropdown(null);
                  }}
                  className={linkClass}
                  style={linkStyle}
                >
                  {label}
                </Link>
              );
            })()}

          </nav>

          {/* Mobile Hamburger */}
          <button
            className={cn(
              "xl:hidden ml-auto transition-colors duration-300",
              overlayTransparent ? "text-white" : isLight ? "text-[#303030]" : "text-foreground"
            )}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={t("Menu")}
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
                        className="flex flex-col items-center text-foreground/60 hover:text-foreground transition-colors"
                      >
                        <span className="font-body text-base font-light">{child.label}</span>
                        {child.linha && (
                          <span className="font-body text-[11px] font-light text-foreground/35">{child.linha}</span>
                        )}
                      </Link>
                    ))}
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
                className="font-display text-3xl font-light text-foreground/80 hover:text-foreground transition-colors py-3"
              >
                {link.label}
              </a>
            );
          }

          return (
            <Link
              key={link.href}
              to={link.href!}
              onClick={(e) => {
                if (link.href === "/" && location.pathname === "/") {
                  e.preventDefault();
                  rolarPara(0, true);
                }
              }}
              className="font-display text-3xl font-light text-foreground/80 hover:text-foreground transition-colors py-3"
            >
              {link.label}
            </Link>
          );
        })}

        {(() => {
          // /zhu saiu da lista: a linha tem catálogo e páginas de produto, então
          // o CTA certo ali é orçamento, não "aguarde o lançamento".
          const emBreve = ["/echo", "/geo"].includes(location.pathname);
          const mobileClass = "mt-6 px-8 py-3 rounded text-white font-display text-sm uppercase tracking-[0.08em]";
          const mobileStyle = { background: "linear-gradient(135deg, #728ea0 25%, #c0c9bf 56%, #d6aa98 74%, #efdcc5 90%)" };
          return emBreve ? (
            <span className={mobileClass} style={mobileStyle}>{t("Lançamento em breve")}</span>
          ) : (
            <Link to="/orcamento" className={mobileClass} style={mobileStyle}>{t("Orçamento")}</Link>
          );
        })()}
      </div>
    </>
  );
}
