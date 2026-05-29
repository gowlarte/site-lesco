import sharp from "sharp";
import pngToIco from "png-to-ico";
import { writeFileSync } from "fs";

const SOURCE = "src/assets/lesco-icon.webp";
const OUT = "public";

// Trim the surrounding whitespace, then place the mark centered on a square
// transparent canvas with a little breathing room (~10% padding).
async function squareMark(size) {
  const trimmed = await sharp(SOURCE).trim().toBuffer();
  const inner = Math.round(size * 0.84); // mark fills 84% of the canvas
  const resized = await sharp(trimmed)
    .resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();
  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([{ input: resized, gravity: "center" }])
    .png()
    .toBuffer();
}

const targets = [
  { name: "favicon-16x16.png", size: 16 },
  { name: "favicon-32x32.png", size: 32 },
  { name: "apple-touch-icon.png", size: 180 },
];

for (const t of targets) {
  const buf = await squareMark(t.size);
  writeFileSync(`${OUT}/${t.name}`, buf);
  console.log("wrote", t.name);
}

// Multi-resolution .ico (16/32/48) from PNG buffers
const icoBuf = await pngToIco([
  await squareMark(16),
  await squareMark(32),
  await squareMark(48),
]);
writeFileSync(`${OUT}/favicon.ico`, icoBuf);
console.log("wrote favicon.ico (16/32/48)");
