

## Plan: Fix Brand Logos Not Rendering in Production

### Problem
The brand logos use CSS `mask-image` with Vite-imported SVG URLs. This works in dev but fails in the published build — the mask doesn't resolve correctly, showing plain colored rectangles instead of shaped logos.

### Solution
Replace the `mask-image` div approach with standard `<img>` tags. To control color dynamically (default `#525252`, active = brand color), use CSS `filter` with `brightness(0)` plus a colored overlay, or more reliably: render each SVG as a React component so fill color can be set directly via props.

**Chosen approach**: Use `<img>` tags with CSS `filter` for the base gray, and on hover/active, apply a colored overlay using a `<div>` with `mix-blend-mode`. However, since exact color matching with filters is unreliable, the cleanest fix is:

**Final approach**: Convert the 4 SVG files to inline React components that accept a `fill` color prop. This gives full color control without mask-image issues.

### Changes

**`src/pages/Index.tsx`**:
- Remove the `mask-image` div block (lines 138-153)
- Replace with an `<img>` tag using `src={linha.logo}` and apply a CSS filter to colorize:
  - Default state: `filter: brightness(0) saturate(100%) opacity(0.6)` (renders dark gray ~#525252)
  - Active state: use an SVG `<filter>` or simply wrap in a container with the brand `backgroundColor` and use `mix-blend-mode: multiply` on a white-background img
  
**Simpler alternative** (recommended): Since the SVGs all use `fill: #303030`, just render them as `<img>` tags. For the inactive gray (#525252), apply a subtle brightness filter. For the active colored state, use a CSS filter matrix computed for each brand color — OR use the approach of wrapping each `<img>` in a div with `style={{ filter }}` where the filter converts black to the target color.

**Simplest fix**: Use `<img>` with the SVGs directly. Apply `opacity: 0.5` for inactive, `opacity: 1` for active. For color changes, wrap in a div with `backgroundColor` set to brand color and use the img with `mix-blend-mode: screen` (for light backgrounds). This avoids mask-image entirely.

### Files Modified
- `src/pages/Index.tsx` — replace mask-image divs with `<img>` elements

