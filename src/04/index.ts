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

export function partOne(input: string = data) {
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

  let boardWithBingo: BingoBoard | undefined = undefined;
  let bingoNumber: number | undefined = undefined;

  bingoInput.every((number) => {
    if (boardWithBingo) {
      // break out of loop
      return false;
    }

    bingoBoards.forEach((board) => {
      const markedBingoBoard = markNumberOnBingoBoard(board, number);
      const boardHasBingo = isBingo(markedBingoBoard);

      if (boardHasBingo) {
        bingoNumber = number;
        boardWithBingo = markedBingoBoard;
      }
    });

    return true;
  });

  if (boardWithBingo && bingoNumber) {
    const unmarkedCellsSum = (boardWithBingo as BingoBoard).reduce(
      (acc, curr) => {
        const unMarkedCells = curr
          .filter((cell) => !cell.marked)
          .map((cell) => cell.value);

        return unMarkedCells.reduce((acc, curr) => acc + curr, acc);
      },
      0
    );

    return unmarkedCellsSum * bingoNumber;
  }
}

export function partTwo(input: string = data) {}
