import fs from "fs";
import path from "path";

const data = fs.readFileSync(path.join(__dirname, "data.txt"), "utf-8").trim();

const solve = (
  [templateString, rulesString]: [string, string],
  iterations: number
) => {
  const rules = new Map<string, string>(
    rulesString
      .split("\n")
      .map((line) => line.split(" -> ") as [string, string])
  );

  let pairs: Record<string, number> = {};
  templateString
    .split("")
    .map((c, idx, arr) => c + arr[idx + 1])
    .slice(0, -1)
    .forEach((pair) => {
      pairs[pair] = (pairs[pair] ?? 0) + 1;
    });
  let elements: Record<string, number> = {};
  templateString.split("").forEach((e) => {
    elements[e] = (elements[e] ?? 0) + 1;
  });

  for (let i = 0; i < iterations; i++) {
    const nextPairs: Record<string, number> = {};
    const nextElements = { ...elements };

    Object.entries(pairs).forEach(([key, value]) => {
      if (rules.has(key)) {
        const middle = rules.get(key)!;
        nextPairs[key[0] + middle] = (nextPairs[key[0] + middle] ?? 0) + value;
        nextPairs[middle + key[1]] = (nextPairs[middle + key[1]] ?? 0) + value;
        nextElements[middle] = (nextElements[middle] ?? 0) + value;
      } else {
        nextPairs[key] = (nextPairs[key] ?? 0) + value;
      }
    });

    pairs = nextPairs;
    elements = nextElements;
  }

  const min = Math.min(...Object.values(elements));
  const max = Math.max(...Object.values(elements));

  return max - min;
};

export function partOne(input: string = data) {
  const [templateString, rulesString] = input.split("\n\n");
  return solve([templateString, rulesString], 10);
}

export function partTwo(input: string = data) {
  const [templateString, rulesString] = input.split("\n\n");
  return solve([templateString, rulesString], 40);
}
