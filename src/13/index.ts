import fs from "fs";
import path from "path";

const data = fs.readFileSync(path.join(__dirname, "data.txt"), "utf-8").trim();

class Map {
  public xLength: number;
  public yLength: number;
  public nodes: Node[] = [];

  constructor(xLength: number, yLength: number) {
    this.xLength = xLength;
    this.yLength = yLength;
  }

  public addNode(node: Node): void {
    this.nodes.push(node);
  }

  public removeNode(node: Node): void {
    this.nodes = this.nodes.filter((n) => n !== node);
  }

  public getNodes(): Node[] {
    return this.nodes;
  }

  public getNodesNumber(): number {
    return this.nodes.length;
  }

  private setXLength(xLength: number): void {
    this.xLength = xLength;
  }

  private setYLength(yLength: number): void {
    this.yLength = yLength;
  }

  public fold(axis: "x" | "y", line: number): void {
    if (axis === "x") {
      for (const node of this.nodes) {
        if (node.x > line) {
          const newX = this.xLength - 1 - node.x;

          if (this.findNode(newX, node.y)) {
            this.removeNode(node);
          } else {
            node.x = newX;
          }
        }
      }
      this.setXLength(line);
    } else {
      for (const node of this.nodes) {
        if (node.y > line) {
          const newY = this.yLength - 1 - node.y;

          if (this.findNode(node.x, newY)) {
            this.removeNode(node);
          } else {
            node.y = newY;
          }
        }
      }
      this.setYLength(line);
    }
  }

  private findNode(x: number, y: number): Node | undefined {
    return this.nodes.find((node) => node.x === x && node.y === y);
  }
}

class Node {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

function initializeMap(dotLines: string): Map {
  const dots = dotLines.split("\n");
  const [maxX, maxY] = dots.reduce(
    (acc, dot) => {
      const [x, y] = dot.split(",").map(Number);
      return [Math.max(acc[0], x), Math.max(acc[1], y)];
    },
    [0, 0]
  );

  const map = new Map(maxX + 1, maxY + 1);

  for (const dot of dots) {
    const [x, y] = dot.split(",").map(Number);
    map.addNode(new Node(x, y));
  }

  return map;
}

export function partOne(input: string = data) {
  const [dotLines, instructionsString] = input.split("\n\n");
  const map = initializeMap(dotLines);
  const [instruction, line] = instructionsString.split("\n")[0].split("=");
  const direction = instruction.at(-1) as "x" | "y";

  map.fold(direction, Number(line));

  return map.getNodesNumber();
}

export function partTwo(input: string = data) {
  const [dotLines, instructionsString] = input.split("\n\n");
  const map = initializeMap(dotLines);
  const instructions: ["x" | "y", number][] = instructionsString
    .split("\n")
    .map((instructionString) => {
      const [instruction, line] = instructionString.split("=");
      const direction = instruction.at(-1) as "x" | "y";

      return [direction, Number(line)];
    });

  for (const instruction of instructions) {
    const [direction, line] = instruction;
    map.fold(direction, line);
  }

  const array = Array(map.xLength)
    .fill(undefined)
    .map(() => Array(map.yLength).fill("."));

  for (const node of map.getNodes()) {
    array[node.x][node.y] = "#";
  }

  const solutionString = array.map((line) => line.join("")).join("\n");

  return solutionString;
}
