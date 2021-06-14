import React, {useState} from 'react';
import {ReactSortable} from "react-sortablejs";
import {ListViewItem} from "./ListItem/ListViewItem";
import {Item} from "../../../../Utils/Item";

export const ListViewContent: React.FC<{checkList: boolean}> = ({checkList}) => {
    const [state, setState] = useState<Item[]>([
        {id: 1, text: "shrek", order:0, boardId:0, done: false},
        {id: 2, text: "fiona", order:1, boardId:0, done: true},
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

    const setOrder = (val: Item[]) => {
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