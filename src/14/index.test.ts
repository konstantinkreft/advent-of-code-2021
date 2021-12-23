import { partOne, partTwo } from "./index";

const example1 = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`;

describe("14", () => {
  it("Part 1: Example 1", () => {
    expect(partOne(example1)).toEqual(1588);
  });

  it("Part 2: Example 1", () => {
    expect(partTwo(example1)).toEqual(2188189693529);
  });
});
