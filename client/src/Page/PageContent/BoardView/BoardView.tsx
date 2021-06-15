import React, {useState} from 'react';
import {Board} from "./Board/Board";
import {Item} from "../../../models/Item";

export interface BoardData{
    id: number,
    title: string
}


export const BoardView: React.FC<{boards: BoardData[]}> = ({boards}) => {
    return <div>
        {boards.map(board =>
            <Board items={[{id: 1, text: "shrek", order:0, boardId:0, done: false},
            {id: 2, text: "kral", order:1, boardId:0, done: false},
            {id: 3, text: "fiona", order:1, boardId:1, done: true}]} board={board}/>
        )}
    </div>
}