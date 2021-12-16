import fs from "fs";
import path from "path";

const BOUNDARY = 9;

const data = fs
  .readFileSync(path.join(__dirname, "data.txt"), "utf-8")
  .trim()
  .split("\n")
  .map((line) => line.split("").map(Number));

function getNeighbors(
  input: number[][],
  rowIndex: number,
  columnIndex: number
) {
  const top = rowIndex > 0 ? input[rowIndex - 1][columnIndex] : BOUNDARY;
  const left = columnIndex > 0 ? input[rowIndex][columnIndex - 1] : BOUNDARY;
  const right =
    columnIndex < input[rowIndex].length - 1
      ? input[rowIndex][columnIndex + 1]
      : BOUNDARY;
  const bottom =
    rowIndex < input.length - 1 ? input[rowIndex + 1][columnIndex] : BOUNDARY;

  return [top, left, right, bottom];
}

export function partOne(input: number[][] = data) {
  return input.reduce(
    (totalSum, row, rowIndex) =>
      totalSum +
      row.reduce((columnSum, value, columnIndex) => {
        const [top, left, right, bottom] = getNeighbors(
          input,
          rowIndex,
          columnIndex
        );

        if (value < top && value < left && value < right && value < bottom) {
          return columnSum + (value + 1);
        }

        return columnSum;
      }, 0),
    0
  );
}

function getBasinSize(
  input: number[][],
  rowIndex: number,
  columnIndex: number
) {
  const basinPoints = new Set<string>();

  const recursion = (_rowIndex: number, _columnIndex: number) => {
    const value = input[_rowIndex][_columnIndex];

    if (value < BOUNDARY && !basinPoints.has(`${_rowIndex},${_columnIndex}`)) {
      basinPoints.add(`${_rowIndex},${_columnIndex}`);
      const [top, left, right, bottom] = getNeighbors(
        input,
        _rowIndex,
        _columnIndex
      );

      if (
        top < BOUNDARY &&
        !basinPoints.has(`${_rowIndex - 1},${_columnIndex}`)
      ) {
        recursion(_rowIndex - 1, _columnIndex);
      }

      if (
        left < BOUNDARY &&
        !basinPoints.has(`${_rowIndex},${_columnIndex - 1}`)
      ) {
        recursion(_rowIndex, _columnIndex - 1);
      }

      if (
        right < BOUNDARY &&
        !basinPoints.has(`${_rowIndex},${_columnIndex + 1}`)
      ) {
        recursion(_rowIndex, _columnIndex + 1);
      }

      if (
        bottom < BOUNDARY &&
        !basinPoints.has(`${_rowIndex + 1},${_columnIndex}`)
      ) {
        recursion(_rowIndex + 1, _columnIndex);
      }
    }
  };

  recursion(rowIndex, columnIndex);

  return [...basinPoints].length;
}

export function partTwo(input: number[][] = data) {
  return input
    .reduce<number[]>((allBasins, row, rowIndex) => {
      const rowBasinSizes = row.reduce<number[]>(
        (basins, value, columnIndex) => {
          const [top, left, right, bottom] = getNeighbors(
            input,
            rowIndex,
            columnIndex
          );

          if (value < top && value < left && value < right && value < bottom) {
            // found low point
            const basinSize = getBasinSize(input, rowIndex, columnIndex);

            return [...basins, basinSize];
          }

          return basins;
        },
        []
      );
      return [...allBasins, ...rowBasinSizes];
    }, [])
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((total, size) => total * size);
}
