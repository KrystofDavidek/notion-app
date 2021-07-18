import React, {useState} from "react";
import MenuThreeDots from "./MenuThreeDots/MenuThreeDots";
import { ItemModal } from "../../../ItemModal/ItemModal";
import { Item } from "../../../../../models/Item";
import "./Card.css";
import {useRecoilState} from "recoil";
import {itemsState} from "../../../../../store/atoms";
import {putFetcher} from "../../../../../utils/fetcher";
import {ItemCheck} from "../../../ListView/ListViewContent/ListItem/ItemCheck/ItemCheck";

export const Card: React.FC<{ item: Item; onDelete: any }> = ({ item, onDelete }) => {
    const [items, setItems] = useRecoilState(itemsState);
    const [editable, setEditable] = useState<boolean>();
    const [text, setText] = useState<string>(item.text);
    const index = items.data.findIndex((listItem) => listItem === item);

    const updateItem = async (_id: string, item: Item) => {
        await putFetcher(`page/${item.page_id}/note/${_id}`, JSON.stringify(item));
    };

    const editItemText = (newValue:string) => {
        const newList = replaceItemAtIndex(items.data, index, {
            ...item,
            text: newValue,
        });

        setItems({isLoading: items.isLoading, data: newList});
        updateItem(item._id, newList[index]);
    };

    var content = <p onDoubleClick={() => setEditable(true)}>{text}</p>;

    if (editable){
        const exitEditableAfterKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter' || event.key === 'Escape') {
                setText(event.currentTarget.innerText)
                setEditable(false)
                editItemText(event.currentTarget.innerText)
                event.preventDefault()
                event.stopPropagation()
            }
        }

        content = <span
                id="editable"
                className="item_text itemInputEdit"
                role="textbox"
                contentEditable
                onKeyDown={exitEditableAfterKey}
            >
            {text}
        </span>;
        }

    return (
    <div className="note">
        {content}
      <ItemModal item={item} onDelete={onDelete} />
    </div>
  );
};

function replaceItemAtIndex(arr: Item[], index: number, newValue: Item) {
    return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}