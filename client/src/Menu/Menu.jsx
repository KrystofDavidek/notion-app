import React from 'react';
import "./Menu.css"
import PagesList from "./PagesList/PagesList"
import AddPageItem from "./AddPageItem/AddPageItem"

export default function Menu({ pages }) {
    return (
        <div className="Menu">
            <PagesList pages={pages}/>
            <AddPageItem/>
        </div>
    )
}