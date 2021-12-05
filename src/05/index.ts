import fs from "fs";
import path from "path";

const data = fs
  .readFileSync(path.join(__dirname, "data.txt"), "utf-8")
  .trim()
  .split("\n");

function getCoordinates(input: string): [[number, number], [number, number]] {
  const [from, to] = input.split(" -> ");
  const [x1, y1] = from.split(",").map(Number);
  const [x2, y2] = to.split(",").map(Number);

  return [
    [x1, y1],
    [x2, y2],
  ];
}

export function getDiagramSize(input: string[]): [number, number] {
  return input.reduce(
    (acc, curr) => {
      const [[x1, y1], [x2, y2]] = getCoordinates(curr);
      const maxX = Math.max(x1, x2);
      const maxY = Math.max(y1, y2);

      return [Math.max(acc[0], maxX), Math.max(acc[1], maxY)];
    },
    [0, 0]
  );
}

function initDiagram(x: number, y: number): number[][] {
  return Array.from({ length: y }, () => Array.from({ length: x }, () => 0));
}

function getIntersections(diagram: number[][]): number {
  return diagram.reduce(
    (acc, curr) => acc + curr.reduce((a, c) => (c >= 2 ? a + 1 : a), 0),
    0
  );
}

export function partOne(input: string[] = data) {
  const [x, y] = getDiagramSize(input);
  const diagram = initDiagram(x + 1, y + 1);

  input.forEach((line) => {
    const [[x1, y1], [x2, y2]] = getCoordinates(line);

    if (x1 === x2) {
      const [start, end] = y1 < y2 ? [y1, y2] : [y2, y1];

      for (let i = start; i <= end; i++) {
        diagram[i][x1] += 1;
      }
    } else if (y1 === y2) {
      const [start, end] = x1 < x2 ? [x1, x2] : [x2, x1];

      for (let i = start; i <= end; i++) {
        diagram[y1][i] += 1;
      }
    }
  });

  return getIntersections(diagram);
}

export function partTwo(input: string[] = data) {
  const [x, y] = getDiagramSize(input);
  const diagram = initDiagram(x + 1, y + 1);

  input.forEach((line) => {
    const [[x1, y1], [x2, y2]] = getCoordinates(line);

    if (x1 === x2) {
      const [start, end] = y1 < y2 ? [y1, y2] : [y2, y1];

      for (let i = start; i <= end; i++) {
        diagram[i][x1] += 1;
      }
    } else if (y1 === y2) {
      const [start, end] = x1 < x2 ? [x1, x2] : [x2, x1];

      for (let i = start; i <= end; i++) {
        diagram[y1][i] += 1;
      }
    } else {
      for (let i = 0; i <= Math.abs(x1 - x2); i++) {
        const x = x1 > x2 ? x1 - i : x1 + i
        const y = y1 > y2 ? y1 - i : y1 + i
        diagram[y][x] += 1;
      }
    }
  });

  return getIntersections(diagram);
}
