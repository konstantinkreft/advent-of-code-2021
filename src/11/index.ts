import fs from "fs";
import path from "path";

const data = fs
  .readFileSync(path.join(__dirname, "data.txt"), "utf-8")
  .trim()
  .split("\n")
  .map((line) => line.split("").map(Number));

function increase(map: number[][]): number[][] {
  return map.map((row) => row.map((digit) => digit + 1));
}

function pendingFlashes(input: number[][]): boolean {
  return input.some((line) => line.some((digit) => digit >= 10));
}

function increaseAdjacents(map: number[][], row: number, column: number) {
  // Up
  if (column > 0 && map[row][column - 1] !== 0) map[row][column - 1] += 1;
  // Right-Up
  if (row < map.length - 1 && column > 0 && map[row + 1][column - 1] !== 0)
    map[row + 1][column - 1] += 1;
  // Right
  if (row < map.length - 1 && map[row + 1][column] !== 0)
    map[row + 1][column] += 1;
  // Right-Down
  if (
    row < map.length - 1 &&
    column < map[row + 1].length - 1 &&
    map[row + 1][column + 1] !== 0
  ) {
    map[row + 1][column + 1] += 1;
  }
  // Down
  if (column < map[row].length - 1 && map[row][column + 1] !== 0)
    map[row][column + 1] += 1;
  // Down-Left
  if (
    row > 0 &&
    column < map[row - 1].length - 1 &&
    map[row - 1][column + 1] !== 0
  )
    map[row - 1][column + 1] += 1;
  // Left
  if (row > 0 && map[row - 1][column] !== 0) map[row - 1][column] += 1;
  // Left-Up
  if (row > 0 && column > 0 && map[row - 1][column - 1] !== 0)
    map[row - 1][column - 1] += 1;
}

function runStep(map: number[][]): [number, number[][]] {
  const _map = increase([...map]);
  let flashes = 0;

  while (pendingFlashes(_map)) {
    for (let row = 0; row < _map.length; row++) {
      for (let column = 0; column < _map[row].length; column++) {
        if (_map[row][column] >= 10) {
          _map[row][column] = 0;
          flashes += 1;
          increaseAdjacents(_map, row, column);
        }
      }
    }
  }

  return [flashes, _map];
}

export function partOne(input: number[][] = data) {
  return Array.from({ length: 100 }).reduce<[number, number[][]]>(
    (acc) => {
      const [currentFlashes, currentMap] = acc;
      const [flashes, map] = runStep(currentMap);
      return [currentFlashes + flashes, map];
    },
    [0, input]
  )[0];
}

export function partTwo(input: number[][] = data) {
  let map = [...input];
  let steps = 0;

  while (!map.every((row) => row.every((digit) => digit === 0))) {
    steps += 1;
    map = runStep(map)[1];
  }

  return steps;
}
