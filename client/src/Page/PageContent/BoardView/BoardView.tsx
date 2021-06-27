import React from "react";
import { Board } from "./Board/Board";
import {RecoilState} from "recoil";
import {ItemsView} from "../../../store/atoms";

export interface BoardData {
  id: number;
  title: string;
  itemsState: RecoilState<ItemsView>
}

export const BoardView: React.FC<{ boards: BoardData[] }> = ({ boards }) => {
  return (
    <div>
      {boards.map((board) => (
        <Board key={board.id} board={board}  />
      ))}
    </div>
  );
};
