import { readFile, readdir } from "fs/promises";
import { resolve, basename } from "path";

export async function getInputs() {
  const prefix = basename(process.argv[1], ".ts") + "_";
  const inputNameWhitelist = process.argv
    .slice(2)
    .map((name) => (name.endsWith(".txt") ? name : name + ".txt"));
  const root = resolve(__dirname, "../input");
  const filepaths = await readdir(root);
  const inputs: [string, string][] = [];
  for (const filepath of filepaths) {
    if (filepath.startsWith(prefix)) {
      const name = filepath.replace(prefix, "");
      if (
        inputNameWhitelist.length > 0 &&
        !inputNameWhitelist.includes(`${name}`)
      ) {
        continue;
      }
      inputs.push([name, await readFile(resolve(root, filepath), "utf8")]);
    }
  }
  return inputs;
}

export async function solve<TInput>(
  inputParser: (raw: string) => TInput,
  solvers: Record<string, (input: TInput) => any>
) {
  const inputs = await getInputs();
  for (const [inputName, input] of inputs) {
    const parsedInput = inputParser(input);
    console.log("=====", inputName, "=====");
    for (const [name, solver] of Object.entries(solvers)) {
      console.log(`${name}: ${solver(parsedInput)}`);
    }
  }
}
