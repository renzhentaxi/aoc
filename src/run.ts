import { glob } from "glob";
import { resolve } from "path";
import { argv } from "process";
import { getTestcases } from "./getTestcases";
import { getSolutions } from "./getSolutions";
import { isEqual } from "lodash";
export async function run(filePattern: string) {
  const problemFolders = await glob(resolve(__dirname, "..", filePattern));
  for (const problemFolder of problemFolders) {
    console.log(`${problemFolder}:`);
    const testcases = await getTestcases(problemFolder);
    const solutions = getSolutions(problemFolder);
    for (const solution of solutions) {
      console.log(solution.name, ":");
      for (const testcase of testcases) {
        const actual = solution.fn(testcase.input);
        if (isEqual(actual, testcase.output)) {
          console.log(`${testcase.name}: passed`);
        } else {
          console.log(`${testcase.name}:`);
          console.log(`\tExpected: ${testcase.output}`);
          console.log(`\tActual:   ${actual}`);
        }
      }
    }
  }
}

run(argv[2]);
