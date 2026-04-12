

## Plan: Editorial Redesign of Product Lines Section

### What's changing

The hero/lines section needs to shift from a rigid 3-column grid with fixed center images to a high-end editorial layout where the image follows the mouse cursor and brand names are rendered as large typographic text (not SVG masks).

### Reference comparison
- **Image 1 (current)**: 3-column grid, small SVG logo masks, fixed center image, cramped layout
- **Image 2 (desired)**: Large text brand names (~80-100px), image follows cursor, 2-column layout (name left, description right), generous vertical spacing, decorative underline, more editorial presence

---

### Changes in `src/pages/Index.tsx`

1. **Replace SVG mask logos with large text**: Remove the `maskImage` div approach. Render brand names as `<h3>` text using `font-display` at `text-[72px] lg:text-[96px] font-light`. Inactive color `#2E2E2E`, active color = brand color.

2. **Layout from 3-col grid to 2-col**: Change to `grid-cols-[40%_1fr]` — brand name + underline on left, description on right. Remove the center image column entirely from the grid.

3. **Mouse-following image**: Bring back `mousePos` state tracking (`onMouseMove` on the section). Render ONE floating `<div>` (outside the row loop) that is `position: absolute`, `pointer-events-none`, positioned at `left: mouseX`, `top: mouseY` with `translate(-50%, -50%)`. Shows the active line's cycling images. Appears only when `isHovering` is true, with opacity/scale transition.

4. **Larger vertical spacing**: Increase row padding from `py-10 lg:py-12` to `py-14 lg:py-20` for more editorial breathing room. Section padding increased.

5. **Description typography**: Increase from `text-[15px]` to `text-[18px] lg:text-[20px]`, keep `font-extralight`.

6. **Section container**: Change from `container px-6` to full-width with `px-12 lg:px-20` for edge-to-edge editorial feel.

7. **New logo**: Copy the uploaded `Logo-lesco-cor-dark-2.svg` to `src/assets/` and update `Header.tsx` to use it as the header logo.

### Changes in `src/components/Header.tsx`

- Import and use the new dark color logo SVG instead of `logo-lesco-light.svg`.

### Files modified
- `src/pages/Index.tsx` — hero section layout, mouse tracking, typography
- `src/components/Header.tsx` — new logo
- `src/assets/Logo-lesco-cor-dark-2.svg` — new asset

