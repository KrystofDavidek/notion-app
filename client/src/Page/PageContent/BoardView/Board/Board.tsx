import React from "react";
import "./Board.css";
import { ReactSortable } from "react-sortablejs";
import { BoardData } from "../BoardView";
import { Card } from "./Card/Card";
import { useRecoilState } from "recoil";
import { activePageState } from "../../../../store/atoms";
import { Item, Label } from "../../../../models/Item";
import { AddNoteItem } from "../../AddNoteItem/AddNoteItem";
import { deleteFetcher, postFetcher, putFetcher } from "../../../../utils/fetcher";

export const Board: React.FC<{ board: BoardData }> = ({ board }) => {
  const [activePage, setActivePage] = useRecoilState(activePageState);
  const [items, setItems] = useRecoilState(board.itemsState);

  const addNoteItem = async (noteText: string) => {
    console.log(activePage.data?._id);
    console.log(board.label === Label.Done ? JSON.stringify({ text: noteText, label: Label.Done }) : JSON.stringify({ text: noteText }));
    const data = await postFetcher(
      `page/${activePage.data?._id}/note`,
      board.label === Label.Done ? JSON.stringify({ text: noteText, label: Label.Done }) : JSON.stringify({ text: noteText })
    );
    setItems({ ...items, data: [...items.data, data] });
  };

  const deleteItem = async (_id: string) => {
    await deleteFetcher(`page/${activePage.data?._id}/note/${_id}`);
    setItems({
      ...items,
      data: items.data.filter((item) => {
        return item._id !== _id;
      }),
    });
  };

  const updateItem = async (_id: string, item: Item) => {
    await putFetcher(`page/${activePage.data?._id}/note/${_id}`, JSON.stringify(item));
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
    <div className="Board">
      <span className={`Board__Label-${board.label}`}>{board.label}</span>
      <ReactSortable list={items.data} setList={updateFromBoard} group="board" className="board">
        {items.data.map((item) => (
          <Card key={item._id} item={item} onDelete={deleteItem} />
        ))}
      </ReactSortable>
      <AddNoteItem addNoteItem={addNoteItem} />
    </div>
  );
};
