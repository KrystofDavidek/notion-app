import React from 'react';
import Card from "./Card/Card";
import AddCardButton from "./AddCardButton/AddCardButton";

export default class Board extends React.Component {
    render() {
        return <div>
            <Card/>
            <Card/>
            <AddCardButton/>
        </div>
    }
}