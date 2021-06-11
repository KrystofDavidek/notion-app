import React from 'react';
import PageItem from './PageItem/PageItem';

export default function PagesList({ pages }) {
    return (
        <div>
            {pages.map(page =>
                <PageItem page={page} />)}
        </div>
    )
}