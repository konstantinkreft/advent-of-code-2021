import { partOne, partTwo } from "./index";

const data = `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`;

const testInput = data.split("\n");

describe("10", () => {
  it("part one should return 26397 for test input", () => {
    expect(partOne(testInput)).toEqual(26397);
  });

  it("part two should return 288957 for test input", () => {
    expect(partTwo(testInput)).toEqual(288957);
  });
});
