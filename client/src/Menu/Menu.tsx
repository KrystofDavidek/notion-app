import React from 'react';
import "./Menu.css"
import {PageData} from "../Page/Page";



export const Menu: React.FC<{pages: PageData[]}> = ({ pages }) => {
    console.log(pages)
    return (
        <div>
            {pages.map(page =>
                <div key={page._id}>
                    {page.title}
                </div>)}
        </div>
    )
}