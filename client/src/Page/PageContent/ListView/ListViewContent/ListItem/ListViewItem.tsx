import React from 'react';

import {Item} from "../../../../../Utils/Item";
import {ItemCheck} from "./ItemCheck/ItemCheck";

export const ListViewItem: React.FC<{item: Item,handleCheck?: (id:number, value: boolean) => void}> = ({item, handleCheck}, handleTextChange: (id: number, text: string) => void) => {
    if(handleCheck !== undefined)
        return <li key={item.id}>
            <ItemCheck handleCheck={handleCheck} id={item.id} value={item.done}>
                {item.text}
            </ItemCheck>
        </li>

    return <li key={item.id}>
        {item.text}
    </li>
}