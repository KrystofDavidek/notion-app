import React from "react";
import { ReactSortable } from "react-sortablejs";
import { ListViewItem } from "./ListItem/ListViewItem";
import { useRecoilState } from "recoil";
import { activePageState, itemsStateListView } from "../../../../store/atoms";
import { Item, Label } from "../../../../models/Item";

export const ListViewContent = () => {
  const [activePage, setActivePage] = useRecoilState(activePageState);
  const [items, setItems] = useRecoilState(itemsStateListView);
  const isChecklist = activePage.data?.checkboxes;

  const updateItem = async (_id: string, item: Item) => {
    const requestOptions = {
      method: "PUT",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify(item),
    };
    await fetch(`http://localhost:5000/page/${activePage.data?._id}/note/${_id}`, requestOptions);
  };

  const changeDone = async (id: number, _id: string) => {
    const stateCopy = [...items.data];
    const itemIndex = stateCopy.findIndex((item) => item.id === id);
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
    <ul className={`${isChecklist ? "checks" : ""}`}>
      <ReactSortable list={[...items.data]} setList={setOrder}>
        {items.data.map((item) => (
          <ListViewItem item={item} handleCheck={isChecklist ? changeDone : undefined} />
        ))}
      </ReactSortable>
    </ul>
  );
};
