import React from 'react';
import {ListViewContent} from "./ListViewContent/ListViewContent";

export default class ListView extends React.Component {
    render() {
        return <div>
            <ListViewContent checkList={true}/>
        </div>
    }
}