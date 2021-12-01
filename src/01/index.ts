import { data } from "./data";

// 01 - How many measurements are larger than the previous measurement?
const noOfIncreases = data.reduce((acc, curr, currIdx, array) => {
  if (currIdx === 0) {
    return acc;
  }

  if (curr > array[currIdx - 1]) {
    return acc + 1;
  }

  return acc;
}, 0);

console.log(`No of increases: ${noOfIncreases}`);

// Consider sums of a three-measurement sliding window. How many sums are larger than the previous sum?
const noOfIncreasesSums = data.reduce((acc, curr, currIdx, array) => {
  if (!array[currIdx + 3]) {
    return acc;
  }

  if (
    curr + array[currIdx + 1] + array[currIdx + 2] <
    array[currIdx + 1] + array[currIdx + 2] + array[currIdx + 3]
  ) {
    return acc + 1;
  }

  return acc;
}, 0);

console.log(`No of increases sums: ${noOfIncreasesSums}`);
