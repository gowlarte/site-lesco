

## Fix: Logo flash during splash-to-content transition

### Problem
The main content div uses `transition-all duration-500`, which transitions **all** properties including `visibility`. Since `visibility` doesn't interpolate smoothly (it's either visible or hidden), it causes a visual flash/blink when the splash completes and the site content appears.

Additionally, the body background remains `#141414` permanently, which should be reset once the splash is done so the site renders with its normal background.

### Solution

**`src/App.tsx`**:
1. Replace `transition-all` with `transition-opacity` so only opacity animates smoothly, and `visibility` changes instantly
2. After splash completes, reset body background to the site's default (white/transparent)

**`src/components/SplashScreen.tsx`**:
3. Ensure `onComplete` is called at the start of the fadeout (not after it ends), so the content starts fading in while the splash fades out, creating a smooth crossfade instead of a gap

### Changes
- **`src/App.tsx`**: Change `className="transition-all duration-500"` to `className="transition-opacity duration-500"` and add a `useEffect` that resets `document.body.style.backgroundColor` when `splashDone` becomes true
- **`src/SplashScreen.tsx`**: No structural changes needed, timing already handles crossfade via the fadeout phase

