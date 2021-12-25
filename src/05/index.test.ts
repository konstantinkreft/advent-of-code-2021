import { describe, expect, it } from "vitest";

import { getDiagramSize, partOne, partTwo } from "./index";

const data = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`;

const testInput = data.split("\n");

describe("05", () => {
  it("should get the right diagram size", () => {
    expect(getDiagramSize(testInput)).toEqual([9, 9]);
  });

  it("part one should return 5 for test input", () => {
    expect(partOne(testInput)).toEqual(5);
  });

  it("part two should return 12 for test input", () => {
    expect(partTwo(testInput)).toEqual(12);
  });
});
