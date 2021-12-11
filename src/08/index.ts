import fs from "fs";
import path from "path";

const data = fs
  .readFileSync(path.join(__dirname, "data.txt"), "utf-8")
  .trim()
  .split("\n");

const sortString = (str: string) => str.split("").sort().join("");

const includesAll = (string: string, includes: string) =>
  includes.split("").every((i) => string.split("").includes(i));

export function partOne(input: string[] = data) {
  return input.reduce((acc, line) => {
    const [, secondPart] = line.split(" | ");
    const digits = secondPart.split(" ");

    return (
      acc + digits.filter((digit) => [2, 3, 4, 7].includes(digit.length)).length
    );
  }, 0);
}

export function partTwo(input: string[] = data) {
  return input.reduce((acc, line) => {
    const [firstPart, secondPart] = line.split(" | ");
    const digits = firstPart.split(" ");
    const digitOutput = secondPart.split(" ");

    const digitMap: Record<number, string> = {
      1: sortString(digits.find((digit) => digit.length === 2) as string),
      4: sortString(digits.find((digit) => digit.length === 4) as string),
      7: sortString(digits.find((digit) => digit.length === 3) as string),
      8: sortString(digits.find((digit) => digit.length === 7) as string),
    };

    const isFiveTest = digitMap[4]
      .split("")
      .filter((d) => (digitMap[1].split("").includes(d) ? false : true))
      .join("");

    digitMap[3] = sortString(
      digits.find(
        (digit) => digit.length === 5 && includesAll(digit, digitMap[1])
      ) as string
    );
    digitMap[9] = sortString(
      digits.find(
        (digit) => digit.length === 6 && includesAll(digit, digitMap[4])
      ) as string
    );
    digitMap[0] = sortString(
      digits.find(
        (digit) =>
          digit.length === 6 &&
          !includesAll(digit, digitMap[4]) &&
          includesAll(digit, digitMap[1])
      ) as string
    );
    digitMap[6] = sortString(
      digits.find(
        (digit) => digit.length === 6 && !includesAll(digit, digitMap[1])
      ) as string
    );
    digitMap[5] = sortString(
      digits.find(
        (digit) => digit.length === 5 && includesAll(digit, isFiveTest)
      ) as string
    );
    digitMap[2] = sortString(
      digits.find(
        (digit) =>
          digit.length === 5 &&
          !includesAll(digit, isFiveTest) &&
          !includesAll(digit, digitMap[1])
      ) as string
    );

    const decodedOutputDigits = digitOutput.map((digit) => {
      return Object.keys(digitMap).find((key) => digitMap[key as unknown as number] === sortString(digit));
    }).join("");

    return acc + Number(decodedOutputDigits);
  }, 0);
}
