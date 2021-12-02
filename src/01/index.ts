import fs from "fs";
import path from "path";

export default function day01() {
  const data = fs
    .readFileSync(path.join(__dirname, "data.txt"), "utf-8")
    .trim()
    .split("\n")
    .map((line) => Number(line.trim()));

  console.log("Day 01");

  // 01 - How many measurements are larger than the previous measurement?
  const partOne = data.reduce((acc, curr, currIdx, array) => {
    if (currIdx === 0) {
      return acc;
    }

    if (curr > array[currIdx - 1]) {
      return acc + 1;
    }

    return acc;
  }, 0);

  console.log(`Part 1: ${partOne}`);

  // Consider sums of a three-measurement sliding window. How many sums are larger than the previous sum?
  const partTwo = data.reduce((acc, curr, currIdx, array) => {
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

  console.log(`Part 2: ${partTwo}`);
}
