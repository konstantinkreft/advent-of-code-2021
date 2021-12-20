import fs from "fs";
import path from "path";

const data = fs
  .readFileSync(path.join(__dirname, "data.txt"), "utf-8")
  .trim()
  .split("\n");

declare global {
  interface Array<T> {
    median(): number;
  }
}

if (!Array.prototype.median) {
  Array.prototype.median = function () {
    return this.slice().sort((a, b) => a - b)[Math.floor(this.length / 2)];
  };
}

function getPoints(input: string) {
  const brackets = input.split("");
  const stack: string[] = [];
  let points: number = 0;

  for (const bracket of brackets) {
    if (points > 0) break;

    switch (bracket) {
      case "(":
      case "[":
      case "{":
      case "<":
        stack.push(bracket);
        break;
      case ")":
        stack.at(-1) === "(" ? stack.pop() : (points += 3);
        break;
      case "]":
        stack.at(-1) === "[" ? stack.pop() : (points += 57);
        break;
      case "}":
        stack.at(-1) === "{" ? stack.pop() : (points += 1197);
        break;
      case ">":
        stack.at(-1) === "<" ? stack.pop() : (points += 25137);
        break;
      default:
        break;
    }
  }

  return points;
}

export function partOne(input: string[] = data) {
  return input.reduce((totalSum, row) => {
    return totalSum + getPoints(row);
  }, 0);
}

function getStack(input: string) {
  const brackets = input.split("");
  const stack: string[] = [];

  for (const bracket of brackets) {
    switch (bracket) {
      case "(":
      case "[":
      case "{":
      case "<":
        stack.push(bracket);
        break;
      case ")":
      case "]":
      case "}":
      case ">":
        stack.pop();
        break;
      default:
        break;
    }
  }

  return stack;
}

export function partTwo(input: string[] = data) {
  return input
    .filter((row) => getPoints(row) === 0)
    .map((row) => {
      const stack = getStack(row);

      return stack.reduceRight((sum, bracket) => {
        switch (bracket) {
          case "(":
            return sum * 5 + 1;
          case "[":
            return sum * 5 + 2;
          case "{":
            return sum * 5 + 3;
          case "<":
            return sum * 5 + 4;
          default:
            return sum;
        }
      }, 0);
    })
    .median();
}
