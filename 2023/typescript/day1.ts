import { getInputs } from "./util";

const CHARCODES = {
  "0": "0".charCodeAt(0),
  "9": "9".charCodeAt(0),
};

function getFirstAndLast(line: string) {
  let firstAndLast = 0;
  for (let i = 0; i < line.length; i++) {
    const charCode = line.charCodeAt(i);
    if (CHARCODES["0"] <= charCode && charCode <= CHARCODES["9"]) {
      firstAndLast += 10 * (charCode - CHARCODES["0"]);
      break;
    }
  }

  for (let i = line.length - 1; i >= 0; i--) {
    const charCode = line.charCodeAt(i);
    if (CHARCODES["0"] <= charCode && charCode <= CHARCODES["9"]) {
      firstAndLast += charCode - CHARCODES["0"];
      break;
    }
  }
  return firstAndLast;
}

function part1(input: string[]) {
  const answer = input
    .map((line) => getFirstAndLast(line))
    .reduce((sum, value) => sum + value, 0);
  return answer;
}

const NUMBER_WORDS = "one,two,three,four,five,six,seven,eight,nine"
  .split(",")
  .map((value, index) => [value, index + 1] as const);

function getFirstNumber(line: string) {
  for (let i = 0; i < line.length; i++) {
    const charCode = line.charCodeAt(i);
    if (CHARCODES["0"] <= charCode && charCode <= CHARCODES["9"]) {
      return charCode - CHARCODES["0"];
    }
    for (const [numberWord, numberValue] of NUMBER_WORDS) {
      if (line.slice(i, i + numberWord.length) === numberWord) {
        return numberValue;
      }
    }
  }
  throw new Error(`No number in ${line}`);
}
function getSecondNumber(line: string) {
  for (let i = line.length; i >= 0; i--) {
    const charCode = line.charCodeAt(i);
    if (CHARCODES["0"] <= charCode && charCode <= CHARCODES["9"]) {
      return charCode - CHARCODES["0"];
    }
    for (const [numberWord, numberValue] of NUMBER_WORDS) {
      if (line.slice(i - numberWord.length, i) === numberWord) {
        return numberValue;
      }
    }
  }
  throw new Error(`No number in ${line}`);
}
function getFirstAndLastPart2(line: string) {
  return getFirstNumber(line) * 10 + getSecondNumber(line);
}

function part2(input: string[]) {
  const answer = input
    .map((line) => getFirstAndLastPart2(line))
    .reduce((sum, value) => sum + value, 0);
  return answer;
}

async function solve() {
  const inputs = await getInputs();
  for (const [inputName, input] of inputs) {
    const asLines = input.split("\n");

    console.log("=====", inputName, "=====");
    console.log(`Part 1: ${part1(asLines)}`);
    console.log(`Part 2: ${part2(asLines)}`);
  }
}
solve();
