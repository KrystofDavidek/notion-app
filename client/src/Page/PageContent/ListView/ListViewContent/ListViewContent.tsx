import React, { useState } from "react";
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
  const [checkboxmode, setCheckboxmode] = useState(activePage.data.checkboxes);

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

  const switchCheckboxes = async () => {
    activePage.data.checkboxes ? setCheckboxmode(false) : setCheckboxmode(true)
    try {
      activePage.data.checkboxes
        ? await putFetcher(`switchCheckboxesOff/${activePage.data._id}`)
        : await putFetcher(`switchCheckboxesOn/${activePage.data._id}`);
    } catch {
      throw Error("Switching checkbox on/off was not successful.");
    }
    const newPage = { ...activePage.data };
    newPage.checkboxes = !activePage.data.checkboxes;
    setActivePage({ data: newPage });
  }

  const CheckBoxInput = checkboxmode ? <input type="checkbox" onChange={switchCheckboxes} checked /> : <input type="checkbox" onChange={switchCheckboxes} />;

  return (
    <div className="note-content">
      <div className="checkbox-container">
        <span className="page-type">List view</span>
        <span className="checkbox-container__label">Checkboxes</span>
        <label className="switch">
          {CheckBoxInput}
          <span className="slider round"></span>
        </label>
      </div>
      <hr className="horizontal-line" />

      <ul className={`${activePage.data?.checkboxes ? "checks items" : "items"}`}>
        <ReactSortable className="item-list" list={[...items.data]} setList={setOrder}>
          {items.data.map((item) => (
            <ListViewItem key={item._id} item={item} handleCheck={changeDone} onDelete={deleteItem} checkboxesOn={activePage.data.checkboxes}/>
          ))}
        </ReactSortable>
      </ul>
      <div>
        <AddNoteItem addNoteItem={addNoteItem} />
      </div>
    </div>
  );
};