import { partOne, partTwo } from "./index";

const data = `forward 5
down 5
forward 8
up 3
down 8
forward 2`;

const testInput = data.split("\n");

describe("01", () => {
  it("part one should return 150 for test input", () => {
    expect(partOne(testInput)).toEqual(150);
  });

  it("part two should return 900 for test input", () => {
    expect(partTwo(testInput)).toEqual(900);
  });
});
