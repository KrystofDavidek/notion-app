import React from "react";
import { Label } from "../../../../../../models/Item";
import "./ItemCheck.css";

export const ItemCheck: React.FC<{
  children: React.ReactNode;
  value: Label;
  handleCheck: (_id: string) => void;
  _id: string;
}> = ({ children, value, handleCheck, _id }) => {
  function handleChange(event: any) {
    handleCheck(_id);
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
