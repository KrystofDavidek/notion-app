import React from 'react';
import PageContent from "./PageContent/PageContent";

export interface PageData{
    _id: string,
    title: string,
    user_id: number,
    modified_info_id: number,
    icon_path: string,
    created_at: number,
    modified_at: number,
    deleted_at: number
}

export default class Page extends React.Component {
    render() {
        return <div>
            <PageContent/>
        </div>
    }
}