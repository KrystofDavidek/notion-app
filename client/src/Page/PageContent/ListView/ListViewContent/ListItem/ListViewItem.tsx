import React from "react";
import { Item } from "../../../../../models/Item";
import { ItemCheck } from "./ItemCheck/ItemCheck";

export const ListViewItem: React.FC<{ item: Item; handleCheck?: (id: number, _id: string) => void }> = (
  { item, handleCheck },
  handleTextChange: (id: number, text: string, _id: string) => void
) => {
  if (handleCheck !== undefined)
    return (
      <li key={item._id}>
        <ItemCheck handleCheck={handleCheck} id={item.id} _id={item._id} value={item.label}>
          {item.text}
        </ItemCheck>
      </li>
    );

  return <li key={item._id}>{item.text}</li>;
};
