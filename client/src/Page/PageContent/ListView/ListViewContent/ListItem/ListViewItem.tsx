import React from "react";
import { Item } from "../../../../../models/Item";
import { ItemModal } from "../../../ItemModal/ItemModal";
import { ItemCheck } from "./ItemCheck/ItemCheck";
import "./ListViewItem.css";

export const ListViewItem: React.FC<{ item: Item; handleCheck: (_id: string) => void; onDelete: any; checkboxesOn: boolean }> = (
  { item, handleCheck, onDelete, checkboxesOn }, handleTextChange: (text: string, _id: string) => void
) => {
  if (checkboxesOn)
    return (
      <li className="item" key={item._id}>
        <ItemCheck handleCheck={handleCheck} _id={item._id} value={item.label}>
          <p>{item.text}</p>
        </ItemCheck>
        <ItemModal item={item} onDelete={onDelete} />
      </li>
    );

  return (
    <li className="item" key={item._id}>
      <p className="item__text">{item.text}</p>
      <div className="item__resizable-box resizable-box">
        <img className="resizable-box__image" src="https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png"></img>
      </div>
      <ItemModal item={item} onDelete={onDelete} />
    </li>
  );
};
