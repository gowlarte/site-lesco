

## Fix: Logo compositing - lettering behind swoosh, not below it

### Problem
The current implementation renders the swoosh and lettering as two separate SVGs stacked vertically. The user wants them composited as in the original logo SVG (`logo-lesco-light.svg`, viewBox `0 0 481.11 151.67`), where the lettering and swoosh overlap spatially, with the swoosh rendered ON TOP of the lettering (higher z-index).

### Solution
Use a **single SVG** with the original logo's `viewBox="0 0 481.11 151.67"`. Render layers in this order:
1. **Lettering (L, E, S, C, O globe)** - rendered first (back), fades in during "reveal" phase
2. **Swoosh light** (gray outline) - rendered on top
3. **Swoosh gradient** (color fill with clip-path sweep) - rendered on top
4. **Swoosh trail gradient on O** - rendered last (front, on top of everything)

The swoosh paths need to be repositioned to match the original logo coordinate space. In the standalone swoosh SVG the viewBox is `0 0 350.31 258.97`, but in the full logo SVG the swoosh trail path starts from the same coordinates as the lettering (the trail path `M480.95,24.2...` is already in the logo coordinate space).

### Key changes to `src/components/SplashScreen.tsx`:
- Merge everything into one SVG with `viewBox="0 0 481.11 151.67"`
- The swoosh in the logo coordinate space uses the trail path from the original logo (not the standalone swoosh SVG)
- Lettering group gets the fade-in transition via `opacity` and `transform` attributes
- Swoosh stays visible from the start with its gradient sweep animation
- Remove `mt-4` vertical spacing and separate SVG elements
- Tagline stays as a separate `<p>` element below

### Technical detail
The standalone swoosh SVG (`lesco-swoosh-light.svg`) has different coordinates than the swoosh embedded in the full logo. The full logo already contains the swoosh trail path at the correct position relative to the lettering. We will use those coordinates directly from `logo-lesco-light.svg`.

