import { resolve } from "path";

interface Solution {
  name: string;
  fn: (input: any) => any;
}
export function getSolutions(problemFolder: string): Solution[] {
  const solutionFile = resolve(problemFolder, `solution.ts`);
  const solutions: Solution[] = [];
  for (const [name, fn] of Object.entries<Solution["fn"]>(
    require(solutionFile)
  )) {
    solutions.push({ name, fn });
  }
  return solutions;
}
