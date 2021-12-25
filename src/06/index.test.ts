import { describe, expect, it } from "vitest";

import { partOne, partTwo } from "./index";

const data = `3,4,3,1,2`;

const testInput = data.split(",").map(Number);

describe("06", () => {
  it("part one should return 5934 for test input", () => {
    expect(partOne(testInput)).toEqual(5934);
  });

  it("part two should return 26984457539 for test input", () => {
    expect(partTwo(testInput)).toEqual(26984457539);
  });
});
