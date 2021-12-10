import fs from "fs";
import path from "path";

const data = fs
  .readFileSync(path.join(__dirname, "data.txt"), "utf-8")
  .trim()
  .split(",")
  .map(Number);

function simulateLanternfishPopulation(days: number, initialState: number[]): number {
  const lanternfishsByAge = Array(9).fill(0);

  initialState.forEach((i) => {
    lanternfishsByAge[i]++;
  });

  for (let i = 0; i < days; i++) {
    const noOfLanternfishesWhoDie = lanternfishsByAge[0];

    lanternfishsByAge.forEach((_, index) => {
      // shift lanternfishs by 1
      lanternfishsByAge[index] = lanternfishsByAge[index + 1];
    });

    lanternfishsByAge[6] += noOfLanternfishesWhoDie;
    lanternfishsByAge[8] = noOfLanternfishesWhoDie;
  }

  return lanternfishsByAge.reduce((a, b) => a + b);
}

export function partOne(input: number[] = data) {
  return simulateLanternfishPopulation(80, input);
}

export function partTwo(input: number[] = data) {
  return simulateLanternfishPopulation(256, input);
}
