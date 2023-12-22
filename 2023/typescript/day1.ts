import { getInput } from "./util";

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

async function solve() {
  const file = await getInput();
  const answer = file
    .split("\n")
    .map((line) => getFirstAndLast(line))
    .reduce((sum, value) => sum + value, 0);
  console.log(answer);
}
console.log("0".charCodeAt(0), "9".charCodeAt(0));
solve();
