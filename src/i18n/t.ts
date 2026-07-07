import { LOCALE } from "./locale";
import { en } from "./dictionaries/en";

/**
 * Translate a Portuguese source string.
 *
 * - PT build: returns the source unchanged, so the Portuguese site stays
 *   byte-identical (no dictionary lookup).
 * - EN build: looks the string up in the EN dictionary, falling back to the
 *   PT source when a translation is missing — untranslated content simply
 *   stays in Portuguese instead of breaking.
 *
 * The dictionary is keyed by the exact PT source string (see dictionaries/en).
 */
export function t(pt: string): string {
  if (LOCALE === "pt") return pt;
  return en[pt] ?? pt;
}
