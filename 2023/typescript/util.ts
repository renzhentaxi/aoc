import { readFile, readdir, writeFile } from "fs/promises";
import { resolve, basename } from "path";

const inputPrefix = basename(process.argv[1], ".ts") + "_";
async function getInputs() {
  const inputNameWhitelist = process.argv
    .slice(2)
    .map((name) => (name.endsWith(".txt") ? name : name + ".txt"));
  const root = resolve(__dirname, "../input");
  const filepaths = await readdir(root);
  const inputs: [string, string][] = [];
  for (const filepath of filepaths) {
    if (filepath.startsWith(inputPrefix)) {
      const name = filepath.replace(inputPrefix, "");
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
  const answers: Record<string, Record<string, any>> = {};
  for (const [inputName, input] of inputs) {
    const inputAnswer: Record<string, any> = {};
    const parsedInput = inputParser(input);
    console.log("=====", inputName, "=====");
    for (const [name, solver] of Object.entries(solvers)) {
      const answer = solver(parsedInput);
      console.log(`${name}: ${answer}`);
      inputAnswer[name] = answer;
    }
    answers[inputName] = inputAnswer;
  }

  await writeFile(
    resolve(__dirname, `${inputPrefix}_answer.json`),
    JSON.stringify(answers, undefined, 2)
  );
}

export function sum(list: number[]): number;
export function sum<T>(list: T[], mapper: (value: T) => number): number;
export function sum<T>(list: T[], mapper?: (value: T) => number): number {
  let total = 0;
  for (let item of list) {
    if (mapper) {
      total += mapper(item);
    } else {
      total += item as number;
    }
  }
  return total;
}
