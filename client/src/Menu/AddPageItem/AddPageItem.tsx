import React, { useState } from 'react';
import "./AddPageItem.css";

export const AddPageItem: React.FC<{addPageItem: any}> = ( {addPageItem} ) => {
    const [newPageName, setNewPageName] = useState("");

    const handleSubmit = (evt: React.FormEvent) => {
        evt.preventDefault();
        addPageItem(newPageName)
    }

    return (
        <form className="menu__new-page-form" aria-label="New page" onSubmit={handleSubmit}>
            <input className="menu__submit" aria-label="Add new page" type="submit" value="" />
            <input
                className="menu__input"
                type="text"
                placeholder="New page"
                value={newPageName}
                onChange={e => setNewPageName(e.target.value)} />
        </form>
    )
}