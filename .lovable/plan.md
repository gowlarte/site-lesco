

## Page Transition Loader with Swoosh Animation

### Overview
Create a lightweight loading overlay that appears when navigating between internal pages (excluding home `/`). It shows the animated swoosh (lwoosh) centered on screen while fonts and images load, then reveals the page content only when everything is ready.

### Components

**1. `src/components/PageTransitionLoader.tsx`** (new)
- Full-screen overlay with `#141414` background, z-index below splash but above content
- Renders only the swoosh SVG (the colored gradient sweep paths from SplashScreen) centered on screen
- Accepts `isLoading` prop to control visibility with fade-in/fade-out transitions
- Swoosh plays the gradient sweep animation on loop while loading

**2. `src/hooks/usePageAssets.ts`** (new)
- Custom hook that detects when a page's assets are ready
- On route change: sets `loading = true`, then:
  - Waits for `document.fonts.ready`
  - Queries all `<img>` elements in the page container and waits for their `complete` property or `load` events
  - Sets `loading = false` when both conditions are met
- Includes a safety timeout (~4s) to prevent infinite loading
- Returns `{ isLoading: boolean }`

**3. `src/App.tsx`** (modified)
- Wrap routes (except `/`) with the transition loader logic
- Use `useLocation()` to detect route changes
- On navigation to any non-home route: show `PageTransitionLoader`, hide page content (`opacity: 0`)
- When assets ready: fade out loader, fade in content
- Home route (`/`) bypasses this entirely — no loader on initial splash or home page

### Animation Details
- The swoosh SVG uses the same gradient and sweep animation as the splash screen
- The clip-path sweep loops continuously (not a one-shot like the splash)
- Fade-out transition: 400ms opacity when assets are loaded
- Content fade-in: 300ms opacity, triggered simultaneously with loader fade-out

### Flow
```text
User clicks link → route changes
  → PageTransitionLoader appears (swoosh animating)
  → New page renders hidden (opacity: 0)
  → Hook monitors fonts + images
  → All loaded → loader fades out, content fades in
```

### Files Changed
- **New**: `src/components/PageTransitionLoader.tsx`
- **New**: `src/hooks/usePageAssets.ts`
- **Modified**: `src/App.tsx` — add loader orchestration around Routes

