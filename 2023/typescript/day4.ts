import { solve, sum } from "./util";

interface CardData {
  winning: number[];
  chosen: number[];
}

function parseInput(raw: string) {
  const input = raw.split("\n");
  const data: CardData[] = [];
  for (const line of input) {
    const winning: number[] = [];
    const chosen: number[] = [];
    let bag: number[] = winning;
    for (let part of line.split(" ")) {
      if (part.endsWith(":")) {
        continue;
      }
      if (part === "Card" || part === "") {
        continue;
      }
      if (part === "|") {
        bag = chosen;
        continue;
      }
      bag.push(parseInt(part));
    }
    data.push({ winning, chosen });
  }
  return data;
}

function toWins(card: CardData) {
  const wins = card.winning.filter((w) => card.chosen.includes(w));
  return wins;
}

function part1(data: CardData[]) {
  const wins = data.map(toWins).filter((wins) => wins.length > 0);
  const scores = wins.map((win) => Math.pow(2, win.length - 1));
  return sum(scores);
}

function part2(data: CardData[]) {
  const wins = data.map(toWins).map((w) => w.length);
  const copies = Array.from(Array(wins.length)).fill(1);
  wins.forEach((w, i) => {
    for (let x = 0; x < w; x++) {
      copies[i + x + 1] += copies[i];
    }
  });
  return sum(copies);
}
solve(parseInput, { part1, part2 });
