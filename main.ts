// gta6-meme-x-01 entry (Node 22, standard library only).
//
// The entry is the X post itself: a GTA 6 launch-week meme whose picture shows
// make.fun's ghost mascot standing in a Vice City street under a "WASTED" gag.
// This program's only job is to hand POST.json — the post's address on X — to
// the grader by copying it from the repository into the output directory.
// The house reads the post from X (its first picture, then its text) and the
// judge ranks it from that dossier; nothing written here is judged.
//
// Local run, the way the grader runs it:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outputDir, { recursive: true });

const source = join(botDir, "POST.json");
const target = join(outputDir, "POST.json");

// Fail fast on a malformed POST.json instead of handing the grader junk:
// it must be a JSON object with a string url.
let post: unknown;
try {
  post = JSON.parse(readFileSync(source, "utf8"));
} catch (error) {
  console.error(`POST.json could not be read from ${botDir}: ${(error as Error).message}`);
  process.exit(1);
}
if (typeof post !== "object" || post === null || typeof (post as { url?: unknown }).url !== "string") {
  console.error("POST.json must be a JSON object with a string url");
  process.exit(1);
}

try {
  copyFileSync(source, target);
} catch (error) {
  console.error(`could not copy POST.json from ${botDir}: ${(error as Error).message}`);
  process.exit(1);
}
