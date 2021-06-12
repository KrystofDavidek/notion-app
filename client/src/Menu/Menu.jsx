import React from 'react';
import "./Menu.css"
import PagesList from "./PagesList/PagesList"
import AddPageItem from "./AddPageItem/AddPageItem"

export default function Menu({ pages }) {

    const addPageItem = (pageTitle) => {
        console.log(pageTitle);
    }

    return (
        <div className="Menu">
            <PagesList pages={pages}/>
            <AddPageItem addPageItem={addPageItem}/>
        </div>
    )
}