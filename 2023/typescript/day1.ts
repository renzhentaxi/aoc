import { solve } from "./util";

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

NUMBER_WORDS.push(
  ...[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(
    (value) => [value.toString(), value] as const
  )
);

function getFirstNumber(line: string) {
  for (let i = 0; i < line.length; i++) {
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

solve((raw) => raw.split("\n"), {
  part1,
  part2,
});
