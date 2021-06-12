import React from 'react';
import "./Menu.css"
import {PageData} from "../Page/Page";
import {PagesList} from "./PagesList/PagesList"
import {AddPageItem} from "./AddPageItem/AddPageItem"

export const Menu: React.FC<{pages: PageData[]}> = ({ pages }) => {

    const addPageItem = (pageTitle: string) => {
        console.log(pageTitle);
    }

    return (
        <div className="Menu">
            <PagesList pages={pages}/>
            <AddPageItem addPageItem={addPageItem}/>
        </div>
    )
}