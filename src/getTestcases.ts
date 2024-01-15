import { resolve } from "path";
import { readYaml } from "./readYaml";
import { z } from "zod";

const InputSchema = z.record(
  z
    .object({
      input: z.any(),
      output: z.any().optional(),
    })
    .strict()
);

interface Testcase {
  name: string;
  input: any;
  output: any;
}

export async function getTestcases(problemFolder: string): Promise<Testcase[]> {
  const inputFilePath = resolve(problemFolder, "input.yml");
  const inputs = InputSchema.parse(await readYaml(inputFilePath));
  const asTestcases: Testcase[] = [];
  for (const input of Object.entries(inputs)) {
    asTestcases.push({
      name: input[0],
      input: input[1].input,
      output: input[1].output,
    });
  }
  return asTestcases;
}
