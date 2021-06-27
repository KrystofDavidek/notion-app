import React from "react";
import { Board } from "./Board/Board";
import { RecoilState } from "recoil";
import { itemsStateDoing, itemsStateDone, itemsStateToDo, ItemsView } from "../../../store/atoms";

export interface BoardData {
  id: number;
  title: string;
  itemsState: RecoilState<ItemsView>;
}

export const BoardView = () => {
  const boards: BoardData[] = [
    { id: 0, title: "First", itemsState: itemsStateToDo },
    { id: 1, title: "Second", itemsState: itemsStateDoing },
    { id: 2, title: "Third", itemsState: itemsStateDone },
  ];
  return (
    <div>
      {boards.map((board) => (
        <Board key={board.id} board={board} />
      ))}
    </div>
  );
};
