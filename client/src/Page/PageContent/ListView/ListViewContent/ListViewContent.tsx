import React from "react";
import { ReactSortable } from "react-sortablejs";
import { ListViewItem } from "./ListItem/ListViewItem";
import { useRecoilState } from "recoil";
import { activePageState, itemsState } from "../../../../store/atoms";
import { Item, Label } from "../../../../models/Item";
import { AddNoteItem } from "../../AddNoteItem/AddNoteItem";
import "./ListViewContent.css";
import { deleteFetcher, postFetcher, putFetcher } from "../../../../utils/fetcher";

export const ListViewContent = () => {
  const [activePage, setActivePage] = useRecoilState(activePageState);
  const [items, setItems] = useRecoilState(itemsState);
  const isChecklist = activePage.data?.checkboxes;

  const addNoteItem = async (noteText: string) => {
    const note = await postFetcher(`page/${activePage.data?._id}/note`, JSON.stringify({ text: noteText }));
    setItems({ ...items, data: [...items.data, note] });
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

  const changeDone = async (_id: string) => {
    const stateCopy = [...items.data];
    const itemIndex = stateCopy.findIndex((item) => item._id === _id);
    if (stateCopy[itemIndex].label === Label.Done) {
      stateCopy[itemIndex] = { ...stateCopy[itemIndex], label: Label.ToDo };
    } else {
      stateCopy[itemIndex] = { ...stateCopy[itemIndex], label: Label.Done };
    }
    setItems({ ...items, data: stateCopy });
    await updateItem(_id, stateCopy[itemIndex]);
  };

  const changeText = async (id: number, value: string, _id: string) => {
    const stateCopy = [...items.data];
    const itemIndex = stateCopy.findIndex((item) => item.id === id);
    stateCopy[itemIndex] = { ...stateCopy[itemIndex], text: value };
    setItems({ ...items, data: stateCopy });
    await updateItem(_id, stateCopy[itemIndex]);
  };

  const setOrder = (val: Item[]) => {
    const stateCopy = val;
    if (!stateCopy.some((o) => o.hasOwnProperty("chosen"))) {
      for (let i = 0; i < stateCopy.length; i++) {
        stateCopy[i] = {
          ...stateCopy[i],
          order: i,
        };
      }
      setItems({ ...items, data: stateCopy });
      stateCopy.map(async (item) => {
        await updateItem(item._id, item);
      });
    }
  };

  return (
    <ul className={`${isChecklist ? "checks items" : "items"}`}>
      <ReactSortable list={[...items.data]} setList={setOrder}>
        {items.data.map((item) => (
          <ListViewItem item={item} handleCheck={isChecklist ? changeDone : undefined} onDelete={deleteItem} />
        ))}
      </ReactSortable>
      <AddNoteItem addNoteItem={addNoteItem} />
    </ul>
  );
};
