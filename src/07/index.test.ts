import { partOne, partTwo } from "./index";

const data = `16,1,2,0,4,2,7,1,2,14`;

const testInput = data.split(",").map(Number);

describe("06", () => {
  it("part one should return 37 for test input", () => {
    expect(partOne(testInput)).toEqual(37);
  });

  it("part two should return 168 for test input", () => {
    expect(partTwo(testInput)).toEqual(168);
  });
});