import React from "react";
import "./style.css";
import { ReactSortable } from "react-sortablejs";
import { BoardData } from "../BoardView";
import { Card } from "./Card/Card";
import { RecoilState, useRecoilState } from "recoil";
import { activePageState, ItemsView } from "../../../../store/atoms";
import { Item, Label } from "../../../../models/Item";
import { AddNoteItem } from "../../AddNoteItem/AddNoteItem";

export const Board: React.FC<{ board: BoardData }> = ({ board }) => {
  const [activePage, setActivePage] = useRecoilState(activePageState);
  const [items, setItems] = useRecoilState(board.itemsState);

  const addNoteItem = async (noteText: string) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body:
        board.label === Label.Done ? JSON.stringify({ text: noteText, label: Label.Done }) : JSON.stringify({ text: noteText }),
    };
    const response = await fetch(`http://localhost:5000/page/${activePage.data?._id}/note`, requestOptions);
    const note = await response.json();
    setItems({ ...items, data: [...items.data, note] });
  };

  const deleteItem = async (_id: string) => {
    const requestOptions = {
      method: "DELETE",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
    };
    await fetch(`http://localhost:5000/page/${activePage.data?._id}/note/${_id}`, requestOptions);
    setItems({
      ...items,
      data: items.data.filter((item) => {
        return item._id !== _id;
      }),
    });
  };

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
          label: board.label,
        };
      }
      setItems({ ...items, data: stateCopy });
      stateCopy.map(async (item) => {
        await updateItem(item._id, item);
      });
    }
  };

  return (
    <>
      <ReactSortable list={items.data} setList={updateFromBoard} group="board" className="board">
        {items.data.map((item) => (
          <Card key={item._id} item={item} onDelete={deleteItem} />
        ))}
      </ReactSortable>
      <AddNoteItem addNoteItem={addNoteItem} />
    </>
  );
};
