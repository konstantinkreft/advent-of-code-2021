import fs from "fs";
import path from "path";

const data = fs.readFileSync(path.join(__dirname, "data.txt"), "utf-8").trim();

interface Packet {
  version: number;
  type: number;
}

interface LiteralPacket extends Packet {
  value: number;
}

interface OperatorPacket extends Packet {
  subPackets: AnyPacket[];
}

type AnyPacket = LiteralPacket | OperatorPacket;

function toBinary(input: string): string {
  return input
    .split("")
    .map((char) => parseInt(char, 16).toString(2).padStart(4, "0"))
    .join("")
    .replace(/0+$/, "");
}

function isLiteralPacket(packet: AnyPacket): packet is LiteralPacket {
  return (packet as LiteralPacket).value !== undefined;
}

function parsePacket(data: string): { packet: AnyPacket; rest: string } {
  const chars = data.split("");
  const version = parseInt(chars.splice(0, 3).join(""), 2);
  const type = parseInt(chars.splice(0, 3).join(""), 2);

  if (type === 4) {
    let literalBinary = "";

    while (true) {
      const sub = chars.splice(0, 5).join("").padEnd(5, "0");
      literalBinary += sub.substring(1);

      if (sub[0] === "0") break;
    }

    const packet: LiteralPacket = {
      version,
      type,
      value: parseInt(literalBinary, 2),
    };
    return { packet, rest: chars.join("") };
  }

  const lenghTypeID = chars.splice(0, 1)[0];

  if (lenghTypeID === "0") {
    const subPacketsLength = parseInt(chars.splice(0, 15).join(""), 2);
    let subPacketContent = chars.splice(0, subPacketsLength).join("");

    const subPackets: AnyPacket[] = [];

    while (subPacketContent.length > 0) {
      const { packet, rest } = parsePacket(subPacketContent);

      subPackets.push(packet);
      subPacketContent = rest;
    }

    const packet: OperatorPacket = { version, type, subPackets };
    return { packet, rest: chars.join("") };
  } else {
    const subPacketCount = parseInt(chars.splice(0, 11).join(""), 2);
    let subData = chars.join("");

    const subPackets: AnyPacket[] = [];

    for (let i = 0; i < subPacketCount; i++) {
      const { packet, rest } = parsePacket(subData);

      subPackets.push(packet);
      subData = rest;
    }

    const packet: OperatorPacket = { version, type, subPackets };
    return { packet, rest: subData };
  }
}

export async function partOne(input: string = data) {
  const binary = toBinary(input);
  const rootPacket = parsePacket(binary).packet;

  function packetVersionSum(packet: AnyPacket): number {
    if (isLiteralPacket(packet)) return packet.version;

    return (
      packet.version +
      packet.subPackets.reduce((sum, sub) => sum + packetVersionSum(sub), 0)
    );
  }

  return packetVersionSum(rootPacket);
}

export async function partTwo(input: string = data) {
  const binary = toBinary(input);
  const rootPacket = parsePacket(binary).packet;

  function getPacketValue(packet: AnyPacket): number {
    if (isLiteralPacket(packet)) return packet.value;

    const subPacketValues = packet.subPackets.map((subPacket) =>
      getPacketValue(subPacket)
    );

    switch (packet.type) {
      case 0:
        return subPacketValues.reduce((a, b) => a + b);
      case 1:
        return subPacketValues.reduce((a, b) => a * b);
      case 2:
        return Math.min(...subPacketValues);
      case 3:
        return Math.max(...subPacketValues);
      case 5:
        return subPacketValues[0] > subPacketValues[1] ? 1 : 0;
      case 6:
        return subPacketValues[0] < subPacketValues[1] ? 1 : 0;
      case 7:
        return subPacketValues[0] === subPacketValues[1] ? 1 : 0;
      default:
        throw new Error("Invalid packet type: " + packet.type);
    }
  }

  return getPacketValue(rootPacket);
}
