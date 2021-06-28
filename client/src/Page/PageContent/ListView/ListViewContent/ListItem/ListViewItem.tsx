import React from "react";
import { Item } from "../../../../../models/Item";
import { ItemCheck } from "./ItemCheck/ItemCheck";

export const ListViewItem: React.FC<{ item: Item; handleCheck?: (_id: string) => void }> = (
  { item, handleCheck },
  handleTextChange: (text: string, _id: string) => void
) => {
  if (handleCheck !== undefined)
    return (
      <li key={item._id}>
        <ItemCheck handleCheck={handleCheck} _id={item._id} value={item.label}>
          {item.text}
        </ItemCheck>
      </li>
    );

  return <li key={item._id}>{item.text}</li>;
};
