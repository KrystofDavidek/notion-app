import React, { useState } from 'react';
import {PageData} from "../../../Page/Page";

export const PageItem: React.FC<{page: PageData}> = ({ page }) => {
    return (
        <div key={page._id}>
            {page.title}
        </div>
    )
}
