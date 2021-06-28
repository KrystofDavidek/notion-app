import React, { useEffect } from "react";
import { Board } from "./Board/Board";
import { RecoilState, useRecoilState } from "recoil";
import { itemsState, itemsStateDoing, itemsStateDone, itemsStateToDo, ItemsView, PartialItemsView } from "../../../store/atoms";
import { Item, Label } from "../../../models/Item";

export interface BoardData {
  id: number;
  title: string;
  itemsState: RecoilState<PartialItemsView>;
}

export const BoardView = () => {
  const [items, setItems] = useRecoilState(itemsState);
  const [itemsToDo, setItemsToDo] = useRecoilState(itemsStateToDo);
  const [itemsDoing, setItemsDoing] = useRecoilState(itemsStateDoing);
  const [itemsDone, setItemsDone] = useRecoilState(itemsStateDone);

  const boards: BoardData[] = [
    { id: 0, title: Label.ToDo, itemsState: itemsStateToDo },
    { id: 1, title: Label.Doing, itemsState: itemsStateDoing },
    { id: 2, title: Label.Done, itemsState: itemsStateDone },
  ];

  useEffect(() => {
    const set = () => {
      const toDo: Item[] = [];
      const doing: Item[] = [];
      const done: Item[] = [];

      items.data.map((item) => {
        switch (item.label) {
          case Label.ToDo:
            toDo.push(item);
            break;
          case Label.Doing:
            doing.push(item);
            break;
          case Label.Done:
            done.push(item);
            break;
          default:
            throw new Error("Problem with notes filtering!");
        }
      });
      setItemsToDo({ data: toDo });
      setItemsDoing({ data: doing });
      setItemsDone({ data: done });
    };
    set();
  }, [items]);

  return (
    <div>
      {boards.map((board) => (
        <Board key={board.id} board={board} />
      ))}
    </div>
  );
};
