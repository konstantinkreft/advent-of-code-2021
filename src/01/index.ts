import fs from "fs";
import path from "path";

const data = fs
.readFileSync(path.join(__dirname, "data.txt"), "utf-8")
.trim()
.split("\n")
.map((line) => Number(line.trim()));

export function partOne(input: number[] = data): number {
  return input.reduce((acc, curr, currIdx, array) => {
    if (currIdx === 0) {
      return acc;
    }

    if (curr > array[currIdx - 1]) {
      return acc + 1;
    }

    return acc;
  }, 0);
}

export function partTwo(input: number[] = data): number {
  return input.reduce((acc, curr, currIdx, array) => {
    if (!array[currIdx + 3]) {
      return acc;
    }

    if (
      curr + array[currIdx + 1] + array[currIdx + 2] <
      array[currIdx + 1] + array[currIdx + 2] + array[currIdx + 3]
    ) {
      return acc + 1;
    }

    return acc;
  }, 0);
}
