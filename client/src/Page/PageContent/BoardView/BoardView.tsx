import React from 'react';
import Board from "./Board/Board";

export default class BoardView extends React.Component {
    render() {
        return <div>
            <Board/>
            <Board/>
        </div>
    }
}