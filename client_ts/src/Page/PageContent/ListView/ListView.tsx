import React from 'react';
import CheckboxesSwitcher from "./CheckboxesSwitcher/CheckboxesSwitcher";
import ListViewContent from "./ListViewContent/ListViewContent";

export default class ListView extends React.Component {
    render() {
        return <div>
            <CheckboxesSwitcher/>
            <ListViewContent/>
        </div>
    }
}