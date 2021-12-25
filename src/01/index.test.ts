import { describe, expect, it } from "vitest";

import { partOne, partTwo } from "./index";

const data = `199
200
208
210
200
207
240
269
260
263`;

const testInput = data.split("\n").map((line) => Number(line.trim()));

describe("01", () => {
  it("part one should return 7 for test input", () => {
    expect(partOne(testInput)).toEqual(7);
  });

  it("part two should return 5 for test input", () => {
    expect(partTwo(testInput)).toEqual(5);
  });
});
