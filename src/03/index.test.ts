import { describe, expect, it } from "vitest";

import { partOne, partTwo } from "./index";

const data = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`;

const testInput = data.split("\n");

describe("03", () => {
  it("part one should return 198 for test input", () => {
    expect(partOne(testInput)).toEqual(198);
  });

  it("part two should return 230 for test input", () => {
    expect(partTwo(testInput)).toEqual(230);
  });
});
