import React, { useState } from 'react';

export const AddPageItem: React.FC<{addPageItem: any}> = ( {addPageItem} ) => {
    const [newPageName, setNewPageName] = useState("");

    const handleSubmit = (evt: React.FormEvent) => {
        evt.preventDefault();
        alert(`Submitting Name ${newPageName}`)
        addPageItem(newPageName)
    }

    return (
        <form className="menu__new-page" aria-label="New page" onSubmit={handleSubmit}>
            <input
                className="menu__input"
                type="text"
                placeholder="New page name"
                value={newPageName}
                onChange={e => setNewPageName(e.target.value)} />
            <input className="menu__submit" aria-label="Add new page" type="submit" value="Add new page" />
        </form>
    )
}