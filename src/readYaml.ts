import { readFile } from "fs/promises";
import { parse } from "yaml";

export async function readYaml<T = unknown>(filepath: string): Promise<T> {
  const src = await readFile(filepath, { encoding: "utf8" });
  return parse(src) as T;
}
