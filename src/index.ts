import { partOne as day01partOne, partTwo as day01partTwo } from "./01";
import { partOne as day02partOne, partTwo as day02partTwo } from "./02";
import { partOne as day03partOne, partTwo as day03partTwo } from "./03";
import { partOne as day04partOne, partTwo as day04partTwo } from "./04";
import { partOne as day05partOne, partTwo as day05partTwo } from "./05";
import { partOne as day06partOne, partTwo as day06partTwo } from "./06";
import { partOne as day07partOne, partTwo as day07partTwo } from "./07";
import { partOne as day08partOne, partTwo as day08partTwo } from "./08";
import { partOne as day09partOne, partTwo as day09partTwo } from "./09";
import { partOne as day10partOne, partTwo as day10partTwo } from "./10";
import { partOne as day11partOne, partTwo as day11partTwo } from "./11";
import { partOne as day12partOne, partTwo as day12partTwo } from "./12";
import { partOne as day13partOne, partTwo as day13partTwo } from "./13";
import { partOne as day14partOne, partTwo as day14partTwo } from "./14";
import { partOne as day15partOne, partTwo as day15partTwo } from "./15";

const solutions: [Function, Function][] = [
  [day01partOne, day01partTwo],
  [day02partOne, day02partTwo],
  [day03partOne, day03partTwo],
  [day04partOne, day04partTwo],
  [day05partOne, day05partTwo],
  [day06partOne, day06partTwo],
  [day07partOne, day07partTwo],
  [day08partOne, day08partTwo],
  [day09partOne, day09partTwo],
  [day10partOne, day10partTwo],
  [day11partOne, day11partTwo],
  [day12partOne, day12partTwo],
  [day13partOne, day13partTwo],
  [day14partOne, day14partTwo],
  [day15partOne, day15partTwo],
];

async function main() {
  for (const [index, solution] of solutions.entries()) {
    const [part1, part2] = solution;
    console.log(`Day ${index + 1}\n`);

    console.log('Part 1');
    console.time("Time");
    const solutionPart1 = await part1();
    console.timeEnd("Time");
    console.log(`Solution: ${solutionPart1}\n`);

    console.log('Part 2');
    console.time("Time");
    const solutionPart2 = await part2();
    console.timeEnd("Time");
    console.log(`Solution: ${solutionPart2}\n`);

    console.log(`-------------------------\n`);
  }
}

main();
