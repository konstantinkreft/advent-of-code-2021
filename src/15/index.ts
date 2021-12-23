import fs from "fs";
import path from "path";
import EasyStar from "easystarjs";

type Grid = number[][];

const data = fs
  .readFileSync(path.join(__dirname, "data.txt"), "utf-8")
  .trim()
  .split("\n")
  .map((line) => line.split("").map(Number));

function solve(input: Grid): Promise<number> {
  return new Promise((resolve) => {
    const easystar = new EasyStar.js();

    easystar.setGrid(input);
    easystar.setAcceptableTiles([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    easystar.setTileCost(1, 1);
    easystar.setTileCost(2, 2);
    easystar.setTileCost(3, 3);
    easystar.setTileCost(4, 4);
    easystar.setTileCost(5, 5);
    easystar.setTileCost(6, 6);
    easystar.setTileCost(7, 7);
    easystar.setTileCost(8, 8);
    easystar.setTileCost(9, 9);

    easystar.findPath(0, 0, input[0].length - 1, input.length - 1, (path) => {
      resolve(
        path.reduce(
          (acc, cur, index) => (index === 0 ? acc : acc + input[cur.y][cur.x]),
          0
        )
      );
    });

    easystar.calculate();
  });
}

export async function partOne(input: Grid = data) {
  return solve(input);
}

export async function partTwo(input: Grid = data) {
  const originalWidth = input.length;
  const originalHeight = Math.max(...input.map((column) => column.length));

  for (let tileX = 0; tileX < 5; tileX++) {
    for (let tileY = 0; tileY < 5; tileY++) {
      for (let x = 0; x < originalWidth; x++) {
        for (let y = 0; y < originalHeight; y++) {
          let risk = input[x][y] + tileX + tileY;

          while (risk > 9) risk -= 9;

          const netX = originalWidth * tileX + x;
          const netY = originalHeight * tileY + y;

          input[netX] ||= [];
          input[netX][netY] = risk;
        }
      }
    }
  }

  return solve(input);
}
