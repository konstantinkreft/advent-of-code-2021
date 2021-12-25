import { describe, expect, it } from "vitest";

import { partOne, partTwo } from "./index";

const data = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`;

const testInput = data.split("\n").map((line) => line.split("").map(Number));

describe("11", () => {
  it("part one should return 1656 for test input", () => {
    expect(partOne(testInput)).toEqual(1656);
  });

  it("part two should return 195 for test input", () => {
    expect(partTwo(testInput)).toEqual(195);
  });
});
