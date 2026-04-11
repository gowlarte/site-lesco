

## Plan: Adjust project gallery spacing and title positioning

### Changes in `src/pages/Index.tsx` (gallery section, lines 201-242)

1. **Change gap from `gap-1` to `gap-[10px]`** on both grid rows (top 2-col and bottom 3-col), and add `gap-[10px]` between the two rows using a flex/gap wrapper or by adding spacing between them.

2. **Move project titles outside the image container** — change from `absolute` positioned text overlaying the image to a static `<p>` below the image. Remove `absolute bottom-4 left-4` and `text-white/80`, use `text-dark` instead. The title sits below the rounded image card.

3. **Add `rounded-[10px]` to each image container** so individual images have rounded corners matching the design system.

4. **Remove `overflow-hidden` from the section wrapper** since individual items now have their own rounding, and the section background should be transparent (showing the `#DBDBDB` page background between items).

