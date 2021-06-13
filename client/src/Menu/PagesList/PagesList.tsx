import React from 'react';
import {PageData} from "../../Page/Page";
import {PageItem} from "../../Menu/PagesList/PageItem/PageItem"

export const PagesList: React.FC<{pages: PageData[]}> = ({ pages }) => {
    return (
        <div>
            {pages.map(page =>
                <PageItem key={page._id} page={page} />)}
        </div>
    )
}