

## Plan: Product Lines Section Redesign

### Summary
Redesign the navbar and product lines hero section to match the Figma prototype, updating typography, colors, hover behaviors, and layout alignment.

---

### Changes

#### 1. Header (`src/components/Header.tsx`)

- **Logo**: Set `w-[93px] h-[29px] object-contain` (replace `h-8`)
- **Nav links**: Change from `text-subheading` to `font-display font-light text-[12px] uppercase tracking-[0.08em] text-[#7F7F7F]`
- **Nav hover effect**: Wrap links in a `group/nav` container. On `nav:hover`, non-hovered items get `blur(0.5px)` and `color: #525252`; hovered item gets `color: #FFFFFF`. Use inline styles or a small state to track which link is hovered
- **Orçamento button**: Change `bg-[hsl(var(--accent-orange))]` to `bg-[#F57D69]`, font to `font-display font-light text-[12px] uppercase`, add `hover:brightness-90`

#### 2. Product Lines Section (`src/pages/Index.tsx`)

**Layout**: Change from `flex flex-wrap items-center justify-between` to a 3-column grid: `grid grid-cols-[25%_1fr_35%] items-start` (desktop). This places the brand name left, image center, description right.

**Brand titles (left column)**:
- Keep SVG mask approach but change inactive color from `rgba(255,255,255,0.3)` to `#2E2E2E`
- Active hover color updates per PRD: AltWood `#C8956C`, Zhúzen `#A8E063`, Echotex `#A0A0A0`, Italflex `#D4A89A`
- Align to top: `self-start` instead of center
- Add decorative underline element below title: a `<span>` that scales from `scaleX(0)` to `scaleX(1)` on hover, colored with the brand color, 1px height, ~80px width

**Image (center column)**:
- Move cycling image from mouse-following overlay to a fixed center column position
- Show with `opacity 0→1` and `translateY(10px)→0` on hover, `rounded-xl` (12-16px)
- Only visible on desktop; hidden on mobile

**Descriptions (right column)**:
- Change font from `font-body` (DM Sans) to `font-display` (PP Neue Machina)
- Weight: `font-extralight` (200)
- Size: `text-[14px]` or `text-[15px]`
- Inactive color: `#525252`
- Active color: brand color from table above
- Remove the `text-xl`, use smaller size per PRD

**Hover colors update** in `linhas` array:
```
AltWood: "#C8956C"
Zhúzen: "#A8E063"
Echotex: "#A0A0A0"
Italflex: "#D4A89A"
```

#### 3. Minor CSS adjustments

No new CSS variables needed — colors will be applied inline. The font weights (200, 300) are already loaded via `@font-face` in `index.css`.

---

### Files Modified
- `src/components/Header.tsx` — navbar styling and hover behavior
- `src/pages/Index.tsx` — product lines section layout, colors, typography, and hover effects

