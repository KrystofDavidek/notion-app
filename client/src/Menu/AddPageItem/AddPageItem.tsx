import React, { useState } from 'react';

export const AddPageItem: React.FC<{addPageItem: any}> = ( {addPageItem} ) => {
    const [newPageName, setNewPageName] = useState("");

    const handleSubmit = (evt: React.FormEvent) => {
        evt.preventDefault();
        alert(`Submitting Name ${newPageName}`)
        addPageItem(newPageName)
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                <input
                    className="Menu__Input"
                    type="text"
                    placeholder="New page"
                    value={newPageName}
                    onChange={e => setNewPageName(e.target.value)} />
            </label>
            <input type="submit" value="Submit" />
        </form>
    )
}