import { partOne, partTwo } from "./index";

const example1 = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`.split("\n");

const example2 = `dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`.split("\n");

const example3 = `fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`.split("\n");

describe("11", () => {
  it("Part 1: Example 1", () => {
    expect(partOne(example1)).toEqual(10);
  });

  it("Part 1: Example 2", () => {
    expect(partOne(example2)).toEqual(19);
  });

  it("Part 1: Example 3", () => {
    expect(partOne(example3)).toEqual(226);
  });

  it("Part 2: Example 1", () => {
    expect(partTwo(example1)).toEqual(36);
  });

  it("Part 2: Example 2", () => {
    expect(partTwo(example2)).toEqual(103);
  });

  it("Part 2: Example 3", () => {
    expect(partTwo(example3)).toEqual(3509);
  });
});
