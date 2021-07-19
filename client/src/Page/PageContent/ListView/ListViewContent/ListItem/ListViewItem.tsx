import React, { useEffect, useState } from "react";
import { Item } from "../../../../../models/Item";
import { ItemModal } from "../../../ItemModal/ItemModal";
import { ItemCheck } from "./ItemCheck/ItemCheck";
import "./ListViewItem.css";
import { useRecoilState } from "recoil";
import { itemsState } from "../../../../../store/atoms";
import { useDetectClickOutside } from "react-detect-click-outside";
import { putFetcher } from "../../../../../utils/fetcher";

export const ListViewItem: React.FC<{ item: Item; handleCheck: (_id: string) => void; onDelete: any; checkboxesOn: boolean }> = (
  { item, handleCheck, onDelete, checkboxesOn },
) => {
  const [items, setItems] = useRecoilState(itemsState);
  const [editable, setEditable] = useState<boolean>();
  const [text, setText] = useState<string>(item.text);
  const index = items.data.findIndex((listItem) => listItem === item);

  const updateItem = async (_id: string, item: Item) => {
    await putFetcher(`page/${item.page_id}/note/${_id}`, JSON.stringify(item));
  };

  const editItemText = (newValue: string) => {
    const newList = replaceItemAtIndex(items.data, index, {
      ...item,
      text: newValue,
    });

    setItems({ isLoading: items.isLoading, data: newList });
    updateItem(item._id, newList[index]);
  };

  var content;

  if (checkboxesOn) {
    content = <React.Fragment><ItemCheck handleCheck={handleCheck} _id={item._id} value={item.label}>
    </ItemCheck>            <p className={"item_text"} onDoubleClick={() => setEditable(true)}>{item.text}</p>
    </React.Fragment>
  } else {
    content = <p onDoubleClick={() => setEditable(true)} className={"item_text item_checkOn_text"}>{item.text}</p>
  }


  const ref = useDetectClickOutside({ onTriggered: () => setEditable(false) });

  if (editable) {
    const exitEditableAfterKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter' || event.key === 'Escape') {
        setText(event.currentTarget.innerText)
        setEditable(false)
        editItemText(event.currentTarget.innerText)
        event.preventDefault()
        event.stopPropagation()
      }
    }

    if (checkboxesOn) {
      content = <React.Fragment><ItemCheck handleCheck={handleCheck} _id={item._id} value={item.label} >

      </ItemCheck><span
        id="editable"
        className="item_text itemInputEdit"
        role="textbox"
        contentEditable
        onKeyDown={exitEditableAfterKey}
        ref={ref}
      >
          {text}
        </span></React.Fragment>;
    }
    else {
      content = <span
        id="editable"
        className="item_text itemInputEdit"
        role="textbox"
        contentEditable
        onKeyDown={exitEditableAfterKey}
        ref={ref}
      >
        {text}
      </span>;
    }
  }

  const addImage = async (imageUrl: string, id: string) => {
    console.log(imageUrl);
    console.log(id);
    const newList = replaceItemAtIndex(items.data, index, {
      ...item,
      imageURL: imageUrl,
    });
    setItems({ isLoading: items.isLoading, data: newList });
    try {
      await putFetcher(`image/${id}`, JSON.stringify({url: imageUrl}));
    } catch {
      throw Error("Updating item with new image was not successfull.");
    }
  }


  return (
    <li className="item" key={item._id}>
      {content}
      {item.imageURL !== undefined ? <div className="item__resizable-box resizable-box">
        <img className="resizable-box__image" src={item.imageURL}></img>
      </div> : null
      }
      <ItemModal item={item} onDelete={onDelete} addImage={addImage} />
    </li>
  );
};

function replaceItemAtIndex(arr: Item[], index: number, newValue: Item) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}