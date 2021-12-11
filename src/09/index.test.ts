import { partOne, partTwo } from "./index";

const data = `2199943210
3987894921
9856789892
8767896789
9899965678`;

const testInput = data.split("\n").map(line => line.split("").map(Number));

describe("08", () => {
  it("part one should return 15 for test input", () => {
    expect(partOne(testInput)).toEqual(15);
  });

  it("part two should return 61229 for test input", () => {
    expect(partTwo(testInput)).toEqual(61229);
  });
});
