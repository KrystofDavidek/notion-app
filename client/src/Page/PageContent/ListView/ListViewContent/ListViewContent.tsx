import React, {useState} from 'react';
import {ReactSortable} from "react-sortablejs";
import {ListViewItem} from "./ListItem/ListViewItem";

export interface ItemType {
    id: number;
    text: string;
    order: number;
    done: boolean
}

export const ListViewContent: React.FC<{checkList: boolean}> = ({checkList}) => {
    const [state, setState] = useState<ItemType[]>([
        {id: 1, text: "shrek", order:0, done: false},
        {id: 2, text: "fiona", order:1, done: true},
    ]);

    const updateItem = (id: number, key: string, value: any) => {
        var stateCopy = [...state];
        var itemIndex = stateCopy.findIndex(item => item.id === id);
        // @ts-ignore
        stateCopy[itemIndex][key] = value
        setState(stateCopy)
        console.log(stateCopy)

        //update server
    }

    const changeDone = (id:number, value: boolean) => {
        updateItem(id, "done", value)
    }

    const changeText = (id:number, value: string) => {
        updateItem(id, "text", value)
    }

    const setOrder = (val: ItemType[]) => {
        if (!val.some(o => o.hasOwnProperty("chosen"))){
            for (var i = 0; i < val.length; i++){
                val[i].order = i;
            }
            setState(val)
            console.log(val)

            //update server
        }
    }

    return (
        <ul className={`${checkList ? "checks": ""}`}>
        <ReactSortable list={state} setList={setOrder}>
            {state.map((item) => (
                <ListViewItem item={item} handleCheck={checkList ? changeDone: undefined}/>
            ))}
        </ReactSortable>
        </ul>

    );
}