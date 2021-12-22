import { partOne, partTwo } from "./index";

const example1 = `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`;

describe("13", () => {
  it("Part 1: Example 1", () => {
    expect(partOne(example1)).toEqual(17);
  });

  it("Part 2: Example 1", () => {
    expect(partTwo(example1)).toEqual(`#####..
#...#..
#...#..
#...#..
#####..`);
  });
});
