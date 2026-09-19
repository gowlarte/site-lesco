import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "@/components/AppLink";
import { Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { rolarPara, assinarScroll, travarScrollSuave } from "@/lib/scroll-suave";
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
type NavItem = { label: string; href?: string; children?: NavChild[]; external?: boolean; grupo: Grupo };

/**
 * Agrupamento do menu mobile. Não é deduzido de "tem filhos" nem do slug: a
 * divisão é editorial — o que a Lesco fabrica de um lado, o que ela publica do
 * outro — e precisa ficar escrita para não virar adivinhação na próxima
 * mudança de rota. O desktop ignora o campo.
 */
type Grupo = "materiais" | "conteudo";

const GRUPOS: { id: Grupo; titulo: string }[] = [
  { id: "materiais", titulo: t("Materiais") },
  { id: "conteudo", titulo: t("Conteúdo") },
];

/** Gradiente da marca. Vive aqui porque o CTA e a marca de item ativo usam o
 *  mesmo, e duas cópias soltas divergem na primeira alteração. */
const GRADIENTE_MARCA =
  "linear-gradient(135deg, #728ea0 25%, #c0c9bf 56%, #d6aa98 74%, #efdcc5 90%)";

/** A anotação fica no literal, não no resultado do `.filter()`: encadeados, o
 *  TypeScript perde o tipo contextual e alarga `grupo` para `string`. */
const todosLinks: NavItem[] = [
  {
    grupo: "materiais",
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
    grupo: "materiais",
    label: t("Bambu"),
    children: [
      { label: t("Painéis e forros"), href: "/painel-bambu", linha: "Zhú" },
      { label: t("Painéis acústicos"), href: "/painel-acustico-bambu", linha: "Zhú" },
      { label: t("Brises"), href: "/brise-bambu", linha: "Zhú" },
      { label: t("Decks"), href: "/deck-bambu", linha: "Zhú" },
    ],
  },
  { grupo: "materiais", label: t("Pedra flexível"), href: "/geo" },
  { grupo: "conteudo", label: t("Catálogo"), href: "/catalogo-lesco" },
  { grupo: "conteudo", label: t("Biblioteca"), href: "/biblioteca" },
  { grupo: "conteudo", label: "Blog", href: "https://blog.lesco.com.br/", external: true },
  { grupo: "conteudo", label: t("Portfólio"), href: "/portfolio" },
];

// Blog é do site PT (blog.lesco.com.br); ocultar no build EN por ora.
const navLinks = todosLinks.filter((link) => !(isEN && link.href?.includes("blog.lesco")));

interface HeaderProps {
  variant?: "default" | "overlay";
}

export function Header({ variant = "default" }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const location = useLocation();
  const painelRef = useRef<HTMLDivElement>(null);
  const fecharRef = useRef<HTMLButtonElement>(null);

  const isOverlay = variant === "overlay";

  // Fora da home basta a distância: passados 60px o cabeçalho já não está
  // mais sobre o topo da página e pede fundo. Na home ele é transparente sobre
  // o hero, e quem sabe dizer quando o hero acabou é o hook.
  const saiuDoHero = useSaiuDoHero();
  const [rolou, setRolou] = useState(false);

  useEffect(() => {
    const sincronizar = () => setRolou(window.scrollY > 60);
    sincronizar(); // um F5 no meio da página já começa rolado
    return assinarScroll(sincronizar);
  }, []);

  const scrolled = isOverlay ? saiuDoHero : rolou;

  useEffect(() => {
    setMenuOpen(false);
    setOpenDropdown(null);
    setMobileExpanded(null);
  }, [location]);

  /**
   * Menu aberto: Esc fecha, Tab circula dentro dele, e a página por baixo
   * para de rolar.
   *
   * O painel não é um Dialog do Radix (o Lightbox é, e ganha isso de graça),
   * então as três coisas são feitas à mão. A trava de rolagem é dupla de
   * propósito: `travarScrollSuave` para o Lenis, `overflow: hidden` para quem
   * não tem Lenis — quem pediu menos movimento, ou antes de ele iniciar.
   */
  useEffect(() => {
    if (!menuOpen) return;

    travarScrollSuave(true);
    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // O painel é modal: nada deve flutuar sobre ele. Quem escuta a marca é o
    // botão do WhatsApp, por CSS em index.css — ele é `fixed` com z-60 e
    // estava cobrindo o canto direito do CTA de orçamento.
    document.documentElement.dataset.menuAberto = "sim";
    fecharRef.current?.focus();

    // O botão de fechar mora no cabeçalho, fora do painel: sem incluí-lo na
    // lista, o Tab escaparia do menu logo no primeiro passo.
    const focaveis = () => {
      const lista: HTMLElement[] = [];
      if (fecharRef.current) lista.push(fecharRef.current);
      const dentro = painelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (dentro) lista.push(...Array.from(dentro).filter((el) => el.offsetParent !== null));
      return lista;
    };

    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const lista = focaveis();
      if (lista.length === 0) return;
      const primeiro = lista[0];
      const ultimo = lista[lista.length - 1];
      if (e.shiftKey && document.activeElement === primeiro) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primeiro.focus();
      }
    };

    window.addEventListener("keydown", aoTeclar);
    return () => {
      window.removeEventListener("keydown", aoTeclar);
      travarScrollSuave(false);
      document.body.style.overflow = overflowAnterior;
      delete document.documentElement.dataset.menuAberto;
    };
  }, [menuOpen]);

  // Passar para a largura do nav de desktop com o menu aberto deixaria o painel
  // escondido por CSS e a rolagem travada por JS.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)");
    const fechar = () => mq.matches && setMenuOpen(false);
    mq.addEventListener("change", fechar);
    return () => mq.removeEventListener("change", fechar);
  }, []);

  const overlayTransparent = isOverlay && !scrolled;
  // Com o painel aberto o cabeçalho fica sobre uma superfície escura: manter o
  // tema claro deixaria uma faixa bege em cima do menu preto.
  const isLight = !isOverlay && !scrolled && !menuOpen;

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

  /** Filete do gradiente da marca à esquerda do item da página atual. O menu
   *  mobile não indicava de nenhuma forma onde o leitor estava. Fica em -18px
   *  para pousar na sangria de 6px da tela, fora da margem de 24px do painel. */
  const marcaAtivo = (
    <span
      aria-hidden="true"
      className="absolute left-[-18px] top-1/2 -translate-y-1/2 h-6 w-[3px] rounded-full"
      style={{ background: GRADIENTE_MARCA }}
    />
  );

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
          // Com o menu aberto o cabeçalho some: a marca e o "Fechar" ficam
          // soltos sobre o painel, sem a barra arredondada desenhando um
          // retângulo por cima dele.
          overlayTransparent || menuOpen
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
                            isLight ? "bg-[#e5e1dc] border border-primary/10" : "bg-[rgba(17,17,16,0.96)] backdrop-blur-xl"
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

          {/* Mobile Hamburger — aberto, vira "Fechar ✕". A palavra ao lado do
              ícone é o que Exo Ape, basement.studio e MONOGRID fazem: o X
              sozinho depende de o leitor já saber o que ele faz. */}
          <button
            ref={fecharRef}
            className={cn(
              "xl:hidden ml-auto flex items-center gap-2.5 transition-colors duration-300",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current",
              overlayTransparent || menuOpen ? "text-white" : isLight ? "text-[#303030]" : "text-foreground"
            )}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? t("Fechar menu") : t("Abrir menu")}
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
          >
            {menuOpen && <span className="rotulo-tec">{t("Fechar")}</span>}
            {menuOpen ? <X size={22} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* ===================== MENU MOBILE =====================
          Índice alinhado à esquerda, em dois grupos rotulados.

          Antes tudo era centralizado — rótulo, seta, filhos e a tag da linha —
          e os sete itens dividiam o mesmo `text-3xl font-light`: "Madeira
          ecológica", que abre seis produtos, ficava visualmente igual a
          "Blog", que é um link externo. Sem borda de alinhamento e sem
          hierarquia, não havia onde o olho descansar.

          O desenho novo vem de três menus premiados, abertos em 375px:
          Exo Ape (lista rente à esquerda, escala grande, entrelinha apertada,
          segundo nível muito menor), basement.studio (item ativo em cor de
          destaque) e MONOGRID (rótulo de seção em mono seguido de filete).
      */}
      <div
        id="menu-mobile"
        ref={painelRef}
        role="dialog"
        aria-modal="true"
        aria-label={t("Menu")}
        data-aberto={menuOpen ? "sim" : undefined}
        className={cn(
          "fixed inset-0 z-40 bg-primary overflow-y-auto overscroll-contain xl:hidden",
          "transition-opacity duration-[400ms]",
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="min-h-full flex flex-col px-6 pt-28 pb-8">
          {GRUPOS.map((grupo, iGrupo) => {
            const itens = navLinks.filter((l) => l.grupo === grupo.id);
            if (itens.length === 0) return null;

            return (
              <section key={grupo.id} className="mb-9">
                {/* Rótulo em mono seguido de filete: é o que quebra as sete
                    linhas iguais em dois blocos com respiro entre eles. */}
                <div
                  className="menu-linha flex items-center gap-4 mb-3"
                  style={{ animationDelay: `${iGrupo * 80}ms` }}
                >
                  {/* /55 e não /40: sobre #111110 o texto de 11px precisa de
                      alfa 0,50 para fechar 4,5:1. A /40 dava 3,49:1, que só
                      serve para ícone. */}
                  <span className="rotulo-tec text-foreground/55">{grupo.titulo}</span>
                  <span className="h-px flex-1 bg-foreground/15" />
                </div>

                {itens.map((link, iItem) => {
                  const atraso = { animationDelay: `${iGrupo * 80 + (iItem + 1) * 45}ms` };
                  const ativo = isActive(link);
                  // Fluido porque "Madeira ecológica" é o rótulo mais longo e,
                  // fixo em 32px, ele pedia 300px num vão de 293 e quebrava em
                  // duas linhas já no iPhone de 375. A 7.8vw ele cabe numa
                  // linha a partir de ~360px, e cresce até 36px no tablet.
                  const escala =
                    "font-display text-[clamp(27px,7.8vw,36px)] leading-[1.06] font-light transition-colors duration-300";

                  if (link.children) {
                    const expanded = mobileExpanded === link.label;
                    return (
                      <div key={link.label} className="menu-linha" style={atraso}>
                        <button
                          type="button"
                          onClick={() => setMobileExpanded(expanded ? null : link.label)}
                          aria-expanded={expanded}
                          className="relative w-full flex items-start justify-between gap-3 py-1.5 text-left"
                        >
                          {ativo && marcaAtivo}
                          <span className={cn(escala, ativo ? "text-foreground" : "text-foreground/85")}>
                            {link.label}
                          </span>
                          {/* `items-start` + este recuo: se o rótulo quebrar
                              numa tela estreita, a seta fica na primeira
                              linha, e não centralizada no bloco de duas. */}
                          <ChevronDown
                            size={20}
                            className={cn(
                              "shrink-0 mt-1.5 text-foreground/40 transition-transform duration-300",
                              expanded && "rotate-180",
                            )}
                          />
                        </button>

                        {/* Ficha técnica: tipo à esquerda, linha comercial à
                            direita, na mesma base, filete entre as linhas.
                            Antes os dois vinham empilhados e centralizados,
                            gastando duas linhas por produto e sem nenhuma
                            borda de alinhamento. */}
                        {expanded && (
                          <div className="pb-4">
                            {link.children.map((child) => {
                              const filhoAtivo = pathOf(child.href) === location.pathname;
                              return (
                                <Link
                                  key={child.href}
                                  to={child.href}
                                  className="flex items-baseline justify-between gap-4 py-2.5 border-b border-foreground/10 last:border-b-0"
                                >
                                  <span
                                    className={cn(
                                      "font-body text-[15px]",
                                      filhoAtivo ? "text-foreground" : "text-foreground/70",
                                    )}
                                  >
                                    {child.label}
                                  </span>
                                  {/* Também /55. O código antigo usava /35 na
                                      tag da linha: 2,96:1, reprovado. */}
                                  {child.linha && (
                                    <span className="font-body text-[11px] text-foreground/55 shrink-0">
                                      {child.linha}
                                    </span>
                                  )}
                                </Link>
                              );
                            })}
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
                        className="menu-linha relative flex items-center justify-between gap-3 py-1.5"
                        style={atraso}
                      >
                        <span className={cn(escala, "text-foreground/85")}>{link.label}</span>
                        <ArrowUpRight size={20} className="shrink-0 text-foreground/40" />
                      </a>
                    );
                  }

                  return (
                    <Link
                      key={link.href}
                      to={link.href!}
                      className="menu-linha relative flex items-center py-1.5"
                      style={atraso}
                    >
                      {ativo && marcaAtivo}
                      <span className={cn(escala, ativo ? "text-foreground" : "text-foreground/85")}>
                        {link.label}
                      </span>
                    </Link>
                  );
                })}
              </section>
            );
          })}

          {(() => {
            // /zhu saiu da lista: a linha tem catálogo e páginas de produto, então
            // o CTA certo ali é orçamento, não "aguarde o lançamento".
            const emBreve = ["/echo", "/geo"].includes(location.pathname);
            // Texto ESCURO sobre o gradiente. Era branco, e o gradiente termina
            // em #efdcc5: dava 1,3:1, ilegível. Escuro fecha 5,8:1 na ponta mais
            // escura (#728ea0) e 14:1 na mais clara.
            const classe =
              "menu-linha mt-auto flex items-center justify-between gap-4 rounded-[10px] px-6 py-4 text-primary font-display text-[13px] uppercase tracking-[0.1em]";
            const estilo = { background: GRADIENTE_MARCA, animationDelay: "320ms" };
            return emBreve ? (
              <span className={classe} style={estilo}>
                {t("Lançamento em breve")}
              </span>
            ) : (
              <Link to="/orcamento" className={classe} style={estilo}>
                {t("Orçamento")}
                <ArrowUpRight size={18} />
              </Link>
            );
          })()}
        </div>
      </div>
    </>
  );
}
