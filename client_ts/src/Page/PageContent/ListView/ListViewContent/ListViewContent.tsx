import React from 'react';
import ListViewItem from "./ListItem/ListViewItem";
import ListAddButton from "./ListAddButton/ListAddButton";

export default class ListViewContent extends React.Component {
    render() {
        return <div>
            <ListViewItem/>
            <ListViewItem/>
            <ListAddButton/>
        </div>
    }
}