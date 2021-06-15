import React from 'react';
import MenuThreeDots from "./MenuThreeDots/MenuThreeDots";
import {Item} from "../../../../../models/Item";
import './style.css'

export const Card: React.FC<{item: Item}> = ({item}) => {
    return <div className="card">
        <p>{item.text}</p>
        <MenuThreeDots/>
    </div>
}