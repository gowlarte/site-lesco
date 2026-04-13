

## Splash Screen: Swoosh centering + slide animation

### Problem
Currently the entire SVG (481x151 viewBox) is centered on screen, but only the swoosh is visible initially. Since the swoosh sits at the right side of the logo (x~330-481), it appears off-center. When the full logo is revealed, the swoosh's extra space to the right makes the logo look left-heavy.

### Solution

Add a CSS `translateX` transition to the SVG wrapper that shifts in two phases:

**Phase 1 ("swoosh")**: Shift the SVG left so the swoosh's visual center (~x=405 in the 481-wide viewBox) aligns with the screen center. This is approximately `-34%` of SVG width.

**Phase 2 ("reveal")**: Animate `translateX` to a small positive offset (~`+6%`) so the final logo is centered based on the typography baseline (L through C, ignoring the swoosh's rightward overshoot).

### Changes to `src/components/SplashScreen.tsx`

1. Add a `transition: transform 800ms cubic-bezier(0.25,0.46,0.45,0.94)` on the SVG element
2. During `swoosh` phase: `transform: translateX(-34%)` (centers the swoosh on screen)
3. During `reveal`/`fadeout` phase: `transform: translateX(3%)` (centers based on typography, slightly right)
4. The lettering fade-in, tagline, and swoosh gradient sweep remain unchanged
5. Tagline also inherits the translateX shift via the parent wrapper

### Timeline

```text
0s ─── Swoosh centered on screen (translateX -34%)
       Gradient sweep begins
~2s ── Assets ready → phase: "reveal"
       SVG slides right over 800ms to final position (translateX +3%)
       Lettering fades in simultaneously
       Tagline fades in 200ms later
~3.5s  Fade-out begins
~4s ── Splash removed
```

