import React from "react";
import { Board } from "./Board/Board";

export interface BoardData {
  id: number;
  title: string;
}

export const BoardView: React.FC<{ boards: BoardData[] }> = ({ boards }) => {
  return (
    <div>
      {boards.map((board) => (
        <Board board={board} />
      ))}
    </div>
  );
};
