import fs from "fs";
import path from "path";

const data = fs
  .readFileSync(path.join(__dirname, "data.txt"), "utf-8")
  .trim()
  .split("\n");

type Path = string[];

class Graph {
  private nodes: Node[];
  private start: Node | null;
  private end: Node | null;

  constructor() {
    this.nodes = [];
    this.start = null;
    this.end = null;
  }

  public getStart(): Node | null {
    return this.start;
  }

  public getEnd(): Node | null {
    return this.end;
  }

  public getNode(value: string): Node | undefined {
    return this.nodes.find((node) => node.getValue() === value);
  }

  public getNodes(): Node[] {
    return this.nodes;
  }

  public addNode(value: string): void {
    if (!this.getNode(value)) {
      const node = new Node(value);
      this.nodes.push(node);

      if (value === "start") {
        this.start = node;
      } else if (value === "end") {
        this.end = node;
      }
    }
  }

  public addEdge(from: string, to: string): void {
    const fromNode = this.getNode(from);
    const toNode = this.getNode(to);
    if (fromNode && toNode) {
      fromNode.addNeighbor(toNode);
      toNode.addNeighbor(fromNode);
    }
  }
}

class Node {
  public isSmall: boolean;
  private value: string;
  private neighbors: Node[];

  constructor(value: string) {
    this.value = value;
    this.isSmall = value.toLowerCase() === value;
    this.neighbors = [];
  }

  public getValue(): string {
    return this.value;
  }

  public addNeighbor(node: Node): void {
    this.neighbors.push(node);
  }

  public getPaths(currentPath: Path, paths: Path[]): Path[] {
    currentPath.push(this.value);

    if (this.value === "end") {
      paths.push(currentPath);
      return paths;
    }

    for (const neighbor of this.neighbors) {
      if (
        (neighbor.isSmall && !currentPath.includes(neighbor.getValue())) ||
        !neighbor.isSmall
      ) {
        neighbor.getPaths(currentPath.slice(), paths);
      }
    }

    return paths;
  }

  getPathsDoubleVisit(
    currentPath: Path,
    paths: Path[],
    doubleVisit: string
  ): Path[] {
    currentPath.push(this.value);

    if (this.value === "end") {
      paths.push(currentPath);
      return paths;
    }

    for (const neighbor of this.neighbors) {
      if (!neighbor.isSmall) {
        neighbor.getPathsDoubleVisit(currentPath.slice(), paths, doubleVisit);
      } else {
        if (!currentPath.includes(neighbor.value)) {
          neighbor.getPathsDoubleVisit(currentPath.slice(), paths, doubleVisit);
        } else if (neighbor.value === doubleVisit) {
          neighbor.getPathsDoubleVisit(currentPath.slice(), paths, "");
        }
      }
    }

    return paths;
  }
}

function initializeGraph(input: string[]): Graph {
  const graph = new Graph();

  for (const line of input) {
    const [from, to] = line.split("-");
    graph.addNode(from);
    graph.addNode(to);
    graph.addEdge(from, to);
  }

  return graph;
}

export function partOne(input: string[] = data) {
  const graph = initializeGraph(input);
  const start = graph.getStart();
  const paths = start ? start.getPaths([], []) : [];

  return paths.length;
}

export function partTwo(input: string[] = data) {
  const graph = initializeGraph(input);

  const smallNodes = graph.getNodes().filter((node) => node.isSmall);
  const smallNodesNotStartEnd = smallNodes.filter(
    (node) => !["start", "end"].includes(node.getValue())
  );

  const start = graph.getStart();
  let totalPaths: Path[] = [];
  for (const smallNode of smallNodesNotStartEnd) {
    const paths = start
      ? start.getPathsDoubleVisit([], [], smallNode.getValue())
      : [];

    totalPaths = totalPaths.concat(paths);
  }

  const paths = totalPaths.map((path) => path.join(","));
  const uniquePaths = [...new Set(paths)];

  return uniquePaths.length;
}
