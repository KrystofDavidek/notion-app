import React from 'react';
import {PageItem} from "../../Menu/PagesList/PageItem/PageItem"
import { PageData } from '../../models/PageData';
import "./PageList.css"

export const PagesList: React.FC<{pages: PageData[]}> = ({ pages }) => {
    return (
        <div className="page-list">
            {pages.map(page =>
                <PageItem key={page._id} page={page} />)}
        </div>
    )
}