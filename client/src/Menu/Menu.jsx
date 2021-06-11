import React from 'react';
import "./Menu.css"

export default function Menu({ pages }) {
    return (
        <div>
            {pages.map(page =>
                <div key={page.id}>
                    {page.title}
                </div>)}
        </div>
    )
}