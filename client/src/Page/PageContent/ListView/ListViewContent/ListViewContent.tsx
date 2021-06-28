import React from "react";
import { ReactSortable } from "react-sortablejs";
import { ListViewItem } from "./ListItem/ListViewItem";
import { useRecoilState } from "recoil";
import { activePageState, itemsState } from "../../../../store/atoms";
import { Item, Label } from "../../../../models/Item";
import { AddNoteItem } from "../../AddNoteItem/AddNoteItem";
import "./ListViewContent.css";

export const ListViewContent = () => {
  const [activePage, setActivePage] = useRecoilState(activePageState);
  const [items, setItems] = useRecoilState(itemsState);
  const isChecklist = activePage.data?.checkboxes;

  const addNoteItem = async (noteText: string) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ text: noteText }),
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
