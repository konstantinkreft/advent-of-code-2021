import { describe, expect, it } from "vitest";

import { partOne, partTwo } from "./index";

describe("16", () => {
  it("Part 1: Example 1", async () => {
    expect(await partOne("8A004A801A8002F478")).toEqual(16);
  });

  it("Part 1: Example 2", async () => {
    expect(await partOne("620080001611562C8802118E34")).toEqual(12);
  });

  it("Part 1: Example 3", async () => {
    expect(await partOne("C0015000016115A2E0802F182340")).toEqual(23);
  });

  it("Part 1: Example 4", async () => {
    expect(await partOne("A0016C880162017C3686B18A3D4780")).toEqual(31);
  });

  it("Part 2: Example 1", async () => {
    expect(await partTwo("C200B40A82")).toEqual(3);
  });

  it("Part 2: Example 2", async () => {
    expect(await partTwo("04005AC33890")).toEqual(54);
  });

  it("Part 2: Example 3", async () => {
    expect(await partTwo("880086C3E88112")).toEqual(7);
  });

  it("Part 2: Example 4", async () => {
    expect(await partTwo("D8005AC2A8F0")).toEqual(1);
  });

  it("Part 2: Example 5", async () => {
    expect(await partTwo("F600BC2D8F")).toEqual(0);
  });

  it("Part 2: Example 6", async () => {
    expect(await partTwo("9C005AC2F8F0")).toEqual(0);
  });

  it("Part 2: Example 7", async () => {
    expect(await partTwo("9C0141080250320F1802104A08")).toEqual(1);
  });
});
