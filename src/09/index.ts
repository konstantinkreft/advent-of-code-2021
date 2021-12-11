import fs from "fs";
import path from "path";

const data = fs
  .readFileSync(path.join(__dirname, "data.txt"), "utf-8")
  .trim()
  .split("\n")
  .map((line) => line.split("").map(Number));

export function partOne(input: number[][] = data) {
  return input.reduce(
    (totalSum, row, rowIndex, rowArray) =>
      totalSum + row.reduce((columnSum, columnItem, columnIndex) => {
        const top = rowIndex > 0 ? input[rowIndex - 1][columnIndex] : 9;
        const left = columnIndex > 0 ? input[rowIndex][columnIndex - 1] : 9;
        const right = columnIndex < row.length - 1 ? input[rowIndex][columnIndex + 1] : 9;
        const bottom = rowIndex < rowArray.length - 1 ? input[rowIndex + 1][columnIndex] : 9;

        if (columnItem < top && columnItem < left && columnItem < right && columnItem < bottom) {
          return columnSum + (columnItem + 1);
        }

        return columnSum;
      }, 0),
    0
  );
}

export function partTwo(input: number[][] = data) {}
