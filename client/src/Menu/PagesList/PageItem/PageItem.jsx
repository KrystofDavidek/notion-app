import React, { useState } from 'react';

export default function PageItem({ page }) {
    return (
        <div key={page._id}>
            {page.title}
        </div>
    )
}
