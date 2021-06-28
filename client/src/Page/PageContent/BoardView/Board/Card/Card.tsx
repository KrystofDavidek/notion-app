import React from "react";
import MenuThreeDots from "./MenuThreeDots/MenuThreeDots";
import { ItemModal } from "../../../ItemModal/ItemModal";
import { Item } from "../../../../../models/Item";
import "./style.css";

export const Card: React.FC<{ item: Item; onDelete: any }> = ({ item, onDelete }) => {
  return (
    <div className="card">
      <p>{item.text}</p>
      <ItemModal item={item} onDelete={onDelete} />
    </div>
  );
};
