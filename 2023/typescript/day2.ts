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

interface GameDetail {
  red: number;
  blue: number;
  green: number;
}
interface Game {
  id: number;
  details: GameDetail[];
}
function isPossible(limit: GameDetail, game: GameDetail[]) {
  for (const gameInstance of game) {
    if (
      gameInstance.blue <= limit.blue &&
      gameInstance.red <= limit.red &&
      gameInstance.green <= limit.green
    ) {
      continue;
    }
    return false;
  }
  return true;
}

function part1(games: Game[]) {
  const limit: GameDetail = { red: 12, green: 13, blue: 14 };
  return games
    .filter((game) => isPossible(limit, game.details))
    .reduce((sum, game) => (sum += game.id), 0);
}

function getMinLimit(game: Game) {
  const minLimit: GameDetail = { blue: 0, red: 0, green: 0 };
  for (let detail of game.details) {
    for (const color of ["blue", "red", "green"] as const) {
      if (detail[color] > minLimit[color]) {
        minLimit[color] = detail[color];
      }
    }
  }
  return minLimit;
}

function part2(games: Game[]) {
  let answer = 0;
  for (const game of games) {
    const minLimit = getMinLimit(game);
    const power = minLimit.blue * minLimit.green * minLimit.red;
    answer += power;
  }
  return answer;
}

function parseInput(raw: string): Game[] {
  const lines = raw.split("\n");
  const inputs: Game[] = [];
  for (const line of lines) {
    const [gameIdPortion, gameDetailPortion] = line.split(":");
    const gameId = parseInt(gameIdPortion.trim().replace("Game ", ""));
    const details: GameDetail[] = [];
    for (const gameSet of gameDetailPortion.split(";")) {
      const detail: GameDetail = { blue: 0, green: 0, red: 0 };
      for (const result of gameSet.split(",")) {
        const [quantityStr, colorStr] = result.trim().split(" ");
        detail[colorStr as "blue"] += parseInt(quantityStr);
      }
      details.push(detail);
    }
    inputs.push({ id: gameId, details });
  }
  return inputs;
}

solve(parseInput, { part1, part2 });
