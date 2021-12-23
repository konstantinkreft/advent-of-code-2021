import { partOne, partTwo } from "./index";

const example1 = `1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`
  .split("\n")
  .map((line) => line.split("").map(Number));

describe("15", () => {
  it("Part 1: Example 1", async () => {
    expect(await partOne(example1)).toEqual(40);
  });

  it("Part 2: Example 1", async () => {
    expect(await partTwo(example1)).toEqual(315);
  });
});
