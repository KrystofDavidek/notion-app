import React from "react";
import { Label } from "../../../../../../models/Item";
import "./ItemCheck.css";

export const ItemCheck: React.FC<{
  value: Label;
  handleCheck: (_id: string) => void;
  _id: string;
}> = ({ value, handleCheck, _id }) => {
  function handleChange(event: any) {
    handleCheck(_id);
  }

  return (
    <label className="containerCheck">
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
