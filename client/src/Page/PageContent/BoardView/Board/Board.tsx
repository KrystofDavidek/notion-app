import React, {useState} from 'react';
import './style.css';
import {ReactSortable} from "react-sortablejs";
import {BoardData} from "../BoardView";
import {Item} from "../../../../models/Item";
import {Card} from "./Card/Card";

export const Board: React.FC<{items: Item[], board: BoardData}> = ({items, board}) => {
    const [list, setList] = useState([...items])

    const updateFromBoard = (val: Item[]) => {
        if (!val.some(o => o.hasOwnProperty("chosen"))) {
            for (var i = 0; i < val.length; i++){
                val[i].order = i;
                val[i].boardId = board.id;
            }
            setList(val)
            console.log(val)
        }
    }

    return <ReactSortable list={list} setList={updateFromBoard} group="board" className="board">
            {list.map((item) => (
                <Card item={item}/>
            ))}
        </ReactSortable>
}