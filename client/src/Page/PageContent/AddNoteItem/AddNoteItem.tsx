import React, { useState } from "react";
import "./AddNoteItem.css";

export const AddNoteItem: React.FC<{ addNoteItem: any }> = ({ addNoteItem }) => {
  const [newItemText, setNewItemText] = useState("");

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    setNewItemText("");
    addNoteItem(newItemText);
  };

  return (
    <form className="menu__new-page-form" aria-label="New note" onSubmit={handleSubmit}>
      <input className="menu__submit" aria-label="Add new note" type="submit" value="" />
      <input
        className="menu__input"
        type="text"
        placeholder="New note"
        value={newItemText}
        onChange={(e) => setNewItemText(e.target.value)}
      />
    </form>
  );
};
