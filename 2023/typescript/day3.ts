import { solve, sum } from "./util";

function isNumber(x: string) {
  return "0123456789".includes(x.charAt(0));
}

function generateUFAndLookup(input: string[]) {
  const numberLookup: Record<number, number> = {};
  const uf: number[] = [];

  for (let y = 0; y < input.length; y++) {
    let parsingNumber = false;
    const line = input[y];
    for (let x = 0; x < line.length; x++) {
      uf.push(-1);
      const i = uf.length - 1;
      if (isNumber(line[x])) {
        const asNumber = parseInt(line[x]);
        if (!parsingNumber) {
          numberLookup[i] = asNumber;
          uf[i] = i;
        } else {
          uf[i] = uf[i - 1];
          numberLookup[uf[i]] = numberLookup[uf[i]] * 10 + asNumber;
        }
        parsingNumber = true;
      } else {
        parsingNumber = false;
      }
    }
  }
  return { uf, numberLookup };
}

function findNeighbors(
  input: string[],
  uf: number[],
  i: number,
  x: number,
  y: number
) {
  const leftIndex = i - 1;
  const rightIndex = i + 1;
  const topIndex = i - input[y].length;
  const botIndex = i + input[y].length;
  const leftTopIndex = topIndex - 1;
  const rightTopIndex = topIndex + 1;
  const leftBotIndex = botIndex - 1;
  const rightBotIndex = botIndex + 1;
  const hasLeft = x > 0;
  const hasRight = x < input[y].length - 1;
  const hasTop = y > 0;
  const hasBot = y < input.length - 1;
  const possible = [
    [hasLeft, leftIndex],
    [hasLeft && hasTop, leftTopIndex],
    [hasLeft && hasBot, leftBotIndex],
    [hasRight, rightIndex],
    [hasRight && hasTop, rightTopIndex],
    [hasRight && hasBot, rightBotIndex],
    [hasTop, topIndex],
    [hasBot, botIndex],
  ] as const;
  let neighbors = new Set<number>();
  for (const [cond, index] of possible) {
    if (cond && uf[index] !== -1) {
      neighbors.add(uf[index]);
    }
  }
  return [...neighbors.values()];
}
function part1(input: string[]) {
  const { uf, numberLookup } = generateUFAndLookup(input);
  const allNeighbors = new Set<number>();

  let i = 0;
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      const char = input[y].charAt(x);
      if (!isNumber(char) && char !== ".") {
        const neighbors = findNeighbors(input, uf, i, x, y);
        neighbors.forEach((neighbor) => allNeighbors.add(neighbor));
      }
      i++;
    }
  }
  const validNumbers: number[] = [...allNeighbors.values()].map(
    (key) => numberLookup[key]
  );
  return sum(validNumbers);
}

function part2(input: string[]) {
  const { uf, numberLookup } = generateUFAndLookup(input);
  let ratios = 0;
  let i = 0;
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      const char = input[y].charAt(x);
      if (char === "*") {
        const neighbors = findNeighbors(input, uf, i, x, y);
        if (neighbors.length === 2) {
          ratios += numberLookup[neighbors[0]] * numberLookup[neighbors[1]];
        }
      }
      i++;
    }
  }
  return ratios;
}

solve((raw) => raw.split("\n"), { part1, part2 });
