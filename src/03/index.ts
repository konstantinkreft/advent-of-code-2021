import fs from "fs";
import path from "path";

const data = fs
  .readFileSync(path.join(__dirname, "data.txt"), "utf-8")
  .trim()
  .split("\n");

function getBitCountForIndex(bits: string[], index: number) {
  const bitCount = bits.reduce(
    (acc, curr) => {
      if (curr[index] === "0") {
        return { ...acc, zeros: acc.zeros + 1 };
      }

      if (curr[index] === "1") {
        return { ...acc, ones: acc.ones + 1 };
      }

      return acc;
    },
    { zeros: 0, ones: 0 }
  );

  return bitCount;
}

export function partOne(input: string[] = data) {
  const length = input[0].length;
  let gammaRate = "";
  let epsilonRate = "";

  for (let i = 0; i < length; i++) {
    const bitCount = getBitCountForIndex(input, i);

    gammaRate += bitCount.ones > bitCount.zeros ? "1" : "0";
    epsilonRate += bitCount.ones < bitCount.zeros ? "1" : "0";
  }

  const gammaRateDecimal = parseInt(gammaRate, 2);
  const epsilonRateDecimal = parseInt(epsilonRate, 2);

  return gammaRateDecimal * epsilonRateDecimal;
}

export function partTwo(input: string[] = data) {
  const length = input[0].length;
  let oxygenGeneratorRating = input;
  let co2ScrubberRating = input;

  for (let i = 0; i < length; i++) {
    const oxygenBitCount = getBitCountForIndex(oxygenGeneratorRating, i);
    const co2BitCount = getBitCountForIndex(co2ScrubberRating, i);

    if (oxygenGeneratorRating.length !== 1) {
      const mostCommonBit = oxygenBitCount.ones >= oxygenBitCount.zeros ? "1" : "0";

      oxygenGeneratorRating = oxygenGeneratorRating.filter((binary) => {
        return binary[i] === mostCommonBit;
      });
    }

    if (co2ScrubberRating.length !== 1) {
      const leastCommonBit = co2BitCount.zeros <= co2BitCount.ones ? "0" : "1";

      co2ScrubberRating = co2ScrubberRating.filter((binary) => {
        return binary[i] === leastCommonBit;
      });
    }
  }

  const oxygenGeneratorRatingDecimal = parseInt(oxygenGeneratorRating[0], 2);
  const co2ScrubberRatingDecimal = parseInt(co2ScrubberRating[0], 2);

  return oxygenGeneratorRatingDecimal * co2ScrubberRatingDecimal;
}
