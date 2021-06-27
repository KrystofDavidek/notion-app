import React from 'react';
import {PageItem} from "../../Menu/PagesList/PageItem/PageItem"
import { PageData } from '../../models/PageData';
import { EmojiData} from '../../models/Icon'
import "./PageList.css"

export const PagesList: React.FC<{pages: PageData[], icons:EmojiData[], updatePageIcons:any}> = ({ pages, icons, updatePageIcons }) => {
    return (
        <div className="page-list">
            {pages.map(page =>
                <PageItem key={page._id} page={page} icons={icons} updatePageIcons={updatePageIcons}/>)}
        </div>
    )
}