import React from "react";
import { Label } from "../../../../../../models/Item";
import "./style.css";

export const ItemCheck: React.FC<{
  children: React.ReactNode;
  value: Label;
  handleCheck: (id: number, _id: string) => void;
  id: number;
  _id: string;
}> = ({ children, value, handleCheck, id, _id }) => {
  function handleChange(event: any) {
    handleCheck(id, _id);
  }

  return (
    <label className="containerCheck">
      {children}
      <input type="checkbox" defaultChecked={checkIsChecked(value)} onChange={handleChange} />
      <span className="checkmark" />
    </label>
  );
};

const checkIsChecked = (label: Label) => {
  if (label === Label.Done) {
    return true;
  }
};
