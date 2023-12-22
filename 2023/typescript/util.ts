import { readFile } from "fs/promises";
import { resolve, basename } from "path";

export function getInput() {
  const entry = basename(process.argv[1], ".ts");
  const filepath = resolve(__dirname, "../input", `${entry}.txt`);
  return readFile(filepath, "utf-8");
}
