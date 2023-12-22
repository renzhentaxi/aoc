import { readFile, readdir } from "fs/promises";
import { resolve, basename } from "path";

export async function getInputs() {
  const prefix = basename(process.argv[1], ".ts") + "_";
  const root = resolve(__dirname, "../input");
  const filepaths = await readdir(root);
  const inputs: [string, string][] = [];
  for (const filepath of filepaths) {
    if (filepath.startsWith(prefix)) {
      inputs.push([
        filepath.replace(prefix, ""),
        await readFile(resolve(root, filepath), "utf8"),
      ]);
    }
  }
  return inputs;
}
