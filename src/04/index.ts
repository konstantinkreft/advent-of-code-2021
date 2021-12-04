import fs from "fs";
import path from "path";

const data = fs.readFileSync(path.join(__dirname, "data.txt"), "utf-8").trim();

export interface BingoBoardCell {
  marked: boolean;
  value: number;
}

export type BingoBoard = BingoBoardCell[][];

export function markNumberOnBingoBoard(board: BingoBoard, number: number) {
  const columnLength = board[0].length;
  const rowLength = board.length;
  const _board = [...board];

  for (let row = 0; row < rowLength; row++) {
    for (let col = 0; col < columnLength; col++) {
      if (_board[row][col].value === number) {
        _board[row][col].marked = true;
      }
    }
  }

  return _board;
}

export function isBingo(board: BingoBoard) {
  return board.some((row, index, boardArray) => {
    const rowBingo = row.every((cell) => cell.marked);
    const columnBingo = boardArray
      .map((row) => row[index])
      .every((cell) => cell.marked);

    return rowBingo || columnBingo;
  });
}

function parseData(input: string): [number[], BingoBoard[]] {
  const [bingoInputString, ...bingoBoardsString] = input.split("\n\n");
  const bingoInput = bingoInputString.split(",").map(Number);
  const bingoBoards: BingoBoard[] = bingoBoardsString.map((bingoBoard) => {
    const rowString = bingoBoard.split("\n");

    return rowString.map((row) => {
      const rowCells = row
        .split(" ")
        .filter((cell) => cell !== "")
        .map((cell) => ({ marked: false, value: Number(cell) }));

      return rowCells;
    });
  });

  return [bingoInput, bingoBoards];
}

function getBingos(bingoBoards: BingoBoard[], inputNumbers: number[]) {
  const bingos: { index: number; bingoNumber: number }[] = [];

  inputNumbers.forEach((number) => {
    bingoBoards.forEach((board, boardIndex) => {
      const alreadySolved = bingos.some((bingo) => bingo.index === boardIndex);

      if (!alreadySolved) {
        const markedBingoBoard = markNumberOnBingoBoard(board, number);
        const boardHasBingo = isBingo(markedBingoBoard);

        if (boardHasBingo) {
          bingos.push({ index: boardIndex, bingoNumber: number });
        }
      }
    });
  });

  return bingos;
}

function getUnmarkedCellsSum(board: BingoBoard) {
  return board.reduce((acc, curr) => {
    const unMarkedCells = curr
      .filter((cell) => !cell.marked)
      .map((cell) => cell.value);

    return unMarkedCells.reduce((acc, curr) => acc + curr, acc);
  }, 0);
}

export function partOne(input: string = data) {
  const [bingoInput, bingoBoards] = parseData(input);
  const bingos = getBingos(bingoBoards, bingoInput);

  const firstBingo = bingos.shift();
  const firstBingoBoard = bingoBoards[firstBingo!.index];
  const firstBingoNumber = firstBingo!.bingoNumber;

  const unmarkedCellsSum = getUnmarkedCellsSum(firstBingoBoard);

  return unmarkedCellsSum * firstBingoNumber;
}

export function partTwo(input: string = data) {
  const [bingoInput, bingoBoards] = parseData(input);
  const bingos = getBingos(bingoBoards, bingoInput);

  const lastBingo = bingos.pop();
  const lastBingoBoard = bingoBoards[lastBingo!.index];
  const lastBingoNumber = lastBingo!.bingoNumber;

  const unmarkedCellsSum = getUnmarkedCellsSum(lastBingoBoard);
  return unmarkedCellsSum * lastBingoNumber;
}
