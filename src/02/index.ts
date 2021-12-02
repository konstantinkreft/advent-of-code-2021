import fs from "fs";
import path from "path";

export default function day02() {
  const data = fs
    .readFileSync(path.join(__dirname, "data.txt"), "utf-8")
    .trim()
    .split("\n");

  console.log("Day 02");

  function getData(line: string): ["forward" | "up" | "down", number] {
    const [direction, valueString] = line.split(" ") as [
      "forward" | "up" | "down",
      string
    ];
    const value = Number(valueString);

    return [direction, value];
  }

  /**
   * Calculate the horizontal position and depth you would have after following the planned course.
   * What do you get if you multiply your final horizontal position by your final depth?
   */
  const partOne = data.reduce(
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

  console.log(`Part 1: ${partOne.horizontalPosition * partOne.depth}`);

  /**
   * Using this new interpretation of the commands, calculate the horizontal position and depth you would have after following the planned course.
   * What do you get if you multiply your final horizontal position by your final depth?
   */
  const partTwo = data.reduce(
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

  console.log(`Part 2: ${partTwo.horizontalPosition * partTwo.depth}`);
}
