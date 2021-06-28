import React from "react";
import { Item } from "../../../../../models/Item";
import { ItemModal } from "../../../ItemModal/ItemModal";
import { ItemCheck } from "./ItemCheck/ItemCheck";
import "./ListViewItem.css";

export const ListViewItem: React.FC<{ item: Item; handleCheck?: (_id: string) => void; onDelete: any }> = (
  { item, handleCheck, onDelete },
  handleTextChange: (text: string, _id: string) => void
) => {
  if (handleCheck !== undefined)
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
      <p>{item.text}</p>
      <ItemModal item={item} onDelete={onDelete} />
    </li>
  );
};
