import sharp from "sharp";
import { readdirSync, statSync, renameSync, unlinkSync, existsSync } from "fs";
import { join, extname } from "path";

const ROOT = "src/assets";
const RASTER = new Set([".png", ".jpg", ".jpeg"]);

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

const files = walk(ROOT);
let savedBytes = 0;
let converted = 0;
let reencoded = 0;
const skipped = [];

function fmt(b) {
  return (b / 1024 / 1024).toFixed(2) + " MB";
}

for (const file of files) {
  const ext = extname(file).toLowerCase();

  if (RASTER.has(ext)) {
    const target = file.slice(0, -ext.length) + ".webp";
    if (existsSync(target)) {
      skipped.push(file + " (target .webp exists)");
      continue;
    }
    const before = statSync(file).size;
    const meta = await sharp(file).metadata();
    const hasAlpha = meta.hasAlpha;
    await sharp(file)
      .webp({
        quality: hasAlpha ? 90 : 80,
        alphaQuality: 100,
        effort: 4,
      })
      .toFile(target);
    const after = statSync(target).size;
    unlinkSync(file);
    savedBytes += before - after;
    converted++;
    if (converted % 25 === 0) console.log(`  converted ${converted}...`);
  } else if (ext === ".webp") {
    const before = statSync(file).size;
    const tmp = file + ".tmp";
    await sharp(file).webp({ quality: 82, alphaQuality: 100, effort: 4 }).toFile(tmp);
    const after = statSync(tmp).size;
    if (after < before) {
      renameSync(tmp, file);
      savedBytes += before - after;
      reencoded++;
    } else {
      unlinkSync(tmp);
    }
  }
}

console.log("\n=== DONE ===");
console.log(`Converted to webp: ${converted}`);
console.log(`Re-encoded webp:   ${reencoded}`);
console.log(`Total saved:       ${fmt(savedBytes)}`);
if (skipped.length) {
  console.log(`Skipped (${skipped.length}):`);
  skipped.forEach((s) => console.log("  - " + s));
}
