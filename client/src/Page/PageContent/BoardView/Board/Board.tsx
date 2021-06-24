import React from "react";
import "./style.css";
import { ReactSortable } from "react-sortablejs";
import { BoardData } from "../BoardView";
import { Card } from "./Card/Card";
import {RecoilState, useRecoilState} from "recoil";
import {activePageState, ItemsView} from "../../../../store/atoms";
import { Item } from "../../../../models/Item";

export const Board: React.FC<{ board: BoardData }> = ({ board }) => {
  const [activePage, setActivePage] = useRecoilState(activePageState);
  const [items, setItems] = useRecoilState(board.itemsState);

  const updateItem = async (_id: string, item: Item) => {
    const requestOptions = {
      method: "PUT",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify(item),
    };
    await fetch(`http://localhost:5000/page/${activePage.data?._id}/note/${_id}`, requestOptions);
  };
  const updateFromBoard = (val: Item[]) => {
    const stateCopy = val;
    if (!val.some((o) => o.hasOwnProperty("chosen"))) {
      for (var i = 0; i < val.length; i++) {
        stateCopy[i] = {
          ...stateCopy[i],
          order: i,
          boardId: board.id,
        };
      }
      setItems({ ...items, data: stateCopy });
      stateCopy.map(async (item) => {
        await updateItem(item._id, item);
      });
    }
  };

  return (
    <ReactSortable list={items.data} setList={updateFromBoard} group="board" className="board">
      {items.data.map((item) => (
        <Card item={item} />
      ))}
    </ReactSortable>
  );
};
