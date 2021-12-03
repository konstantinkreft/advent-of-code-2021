import fs from "fs";
import path from "path";

const data = fs
  .readFileSync(path.join(__dirname, "data.txt"), "utf-8")
  .trim()
  .split("\n");

function getData(line: string): ["forward" | "up" | "down", number] {
  const [direction, valueString] = line.split(" ") as [
    "forward" | "up" | "down",
    string
  ];
  const value = Number(valueString);

  return [direction, value];
}

export function partOne(input: string[] = data): number {
  const { horizontalPosition, depth } = input.reduce(
    (acc, line) => {
      const [direction, value] = getData(line);

      if (direction === "forward") {
        return { ...acc, horizontalPosition: acc.horizontalPosition + value };
      }

      if (direction === "down") {
        return { ...acc, depth: acc.depth + value };
      }

      if (direction === "up") {
        return { ...acc, depth: acc.depth - value };
      }

      return acc;
    },
    { horizontalPosition: 0, depth: 0 }
  );

  return horizontalPosition * depth;
}

export function partTwo(input: string[] = data): number {
  const { horizontalPosition, depth } = input.reduce(
    (acc, line) => {
      const [direction, value] = getData(line);

      if (direction === "forward") {
        return {
          ...acc,
          horizontalPosition: acc.horizontalPosition + value,
          depth: acc.depth + acc.aim * value,
        };
      }

      if (direction === "down") {
        return { ...acc, aim: acc.aim + value };
      }

      if (direction === "up") {
        return { ...acc, aim: acc.aim - value };
      }

      return acc;
    },
    {
      horizontalPosition: 0,
      depth: 0,
      aim: 0,
    }
  );

  return horizontalPosition * depth;
}
