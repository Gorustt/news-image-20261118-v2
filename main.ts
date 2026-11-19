// news-image-20261118 entry for @bretta1 (bretta94).
// A one-page newspaper summing up Wednesday 18 November 2026 in
// 42 stories across six continents, drawn as original vector art.
// The image is the entry.png beside this file; this program copies it
// byte-for-byte to the grader's output directory, so both runs write
// identical bytes. Node 22, standard library only, no network.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in
// for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const SOURCE = new URL("./entry.png", import.meta.url);
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const TARGET = join(OUTPUT_DIR, "entry.png");

// Create the output directory when it does not exist yet.
mkdirSync(OUTPUT_DIR, { recursive: true });
copyFileSync(SOURCE, TARGET);

// Verify the copy byte-for-byte and fail loudly on any mismatch,
// so a truncated or corrupted output can never pass silently.
const sourceBytes = readFileSync(SOURCE);
const targetBytes = readFileSync(TARGET);
if (
  statSync(TARGET).size !== sourceBytes.length ||
  !sourceBytes.equals(targetBytes)
) {
  throw new Error(
    `entry.png copy mismatch: expected ${sourceBytes.length} bytes, wrote ${targetBytes.length} bytes`,
  );
}
console.log(
  `Wrote ${TARGET} (${targetBytes.length} bytes, verified identical).`,
);
