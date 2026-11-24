// Alien Field Notes: The Two Day Earth Review.
// Prints the one-line alien tourist review of Earth from entry.txt
// and writes it to /output/entry.txt for the sealed gate scorer.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const MAX_CHARS = 200;
const OUTPUT_PATH = "/output/entry.txt";

function loadReview(): string {
  const dir = dirname(fileURLToPath(import.meta.url));
  const raw = readFileSync(join(dir, "entry.txt"), "utf8");
  return raw.replace(/\r\n/g, "\n").trim();
}

function checkReview(line: string): void {
  if (line.length === 0) {
    throw new Error("entry.txt is empty: the review must be 1-200 characters");
  }
  if (line.length > MAX_CHARS) {
    throw new Error(
      `review is ${line.length} characters, over the ${MAX_CHARS} limit`,
    );
  }
  if (line.includes("\n")) {
    throw new Error("review must be a single line of plain text");
  }
}

function publish(line: string): void {
  mkdirSync("/output", { recursive: true });
  writeFileSync(OUTPUT_PATH, line + "\n", "utf8");
}

const review = loadReview();
checkReview(review);
publish(review);
console.log(review);
