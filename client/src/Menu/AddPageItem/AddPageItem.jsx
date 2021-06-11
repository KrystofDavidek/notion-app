import React, { useState } from 'react';

export default function AddPageItem() {
    const [newPageName, setNewPageName] = useState("");

    const handleSubmit = (evt) => {
        evt.preventDefault();
        alert(`Submitting Name ${newPageName}`)
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