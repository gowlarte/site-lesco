

## Problem

The header is `fixed` positioned, so it floats over the content. The hero section starts at the top of the page and slides behind the header. The `pt-[10px]` on `<main>` only adds 10px at the top, but the header is ~80px tall + 10px from top = 90px. So the visible gap between header and hero content is just 10px of page background, but the hero section itself starts under the header.

Looking at the reference image: the header and hero section are visually separate cards with the `#DBDBDB` background visible between them. The header sits at `top: 10px`, is ~80px tall, ending at ~90px. The hero section should start after that with a 10px gap, meaning `margin-top` of ~100px (10px top + 80px header + 10px gap).

## Plan

1. **Add top margin to `<main>`** in `src/pages/Index.tsx`: Change `pt-[10px]` to `pt-[100px]` (or use `mt-[100px]`) to push content below the fixed header. This accounts for 10px header offset + 80px header height + 10px gap.

2. **Remove `min-h-screen` from hero section** or keep it — depending on desired look. The hero already has internal padding, so it should be fine.

This single change ensures the gray background (`#DBDBDB`) is visible between the header and the first section, matching the reference screenshot.

