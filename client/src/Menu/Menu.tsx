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
        <nav className="menu">
            <h1 className="menu__header">
                <img alt="Page icon"
                     className="menu__page-icon" src="/client/src/assets/page-school.svg"/>
                Notes X
            </h1>
            <PagesList pages={pages}/>
            <AddPageItem addPageItem={addPageItem}/>
        </nav>
    )
}