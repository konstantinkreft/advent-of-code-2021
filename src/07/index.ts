import fs from "fs";
import path from "path";

const data = fs
  .readFileSync(path.join(__dirname, "data.txt"), "utf-8")
  .trim()
  .split(",")
  .map(Number);

function getMedian(arr: number[]) {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
}

function getAverage(arr: number[]) {
  return arr.reduce((p, c) => p + c, 0) / arr.length;
}

function getFuelConsumption(input: number[], target: number) {
  return input.reduce((acc, curr) => acc + Math.abs(curr - target), 0);
}

function getAdvancedFuelConsumption(input: number[], target: number) {
  return input.reduce((acc, curr) => {
    const diff = Math.abs(curr - target);
    const fuelConsumption = (diff * (diff + 1)) / 2;

    return acc + fuelConsumption;
  }, 0);
}

export function partOne(input: number[] = data) {
  const median = getMedian(input);

  return getFuelConsumption(input, median);
}

export function partTwo(input: number[] = data) {
  const average = getAverage(input);
  const averageFloor = Math.floor(average);
  const averageCeil = Math.ceil(average);
  const floorFuelConsumption = getAdvancedFuelConsumption(input, averageFloor);
  const ceilFuelConsumption = getAdvancedFuelConsumption(input, averageCeil);

  return floorFuelConsumption < ceilFuelConsumption
    ? floorFuelConsumption
    : ceilFuelConsumption;
}
