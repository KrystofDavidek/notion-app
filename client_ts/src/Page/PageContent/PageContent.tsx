import React from 'react';
import ListView from "./ListView/ListView";
import BoardView from "./BoardView/BoardView";

export default class PageContent extends React.Component {
    render() {
        return <div>
            <ListView/>
            <BoardView/>
        </div>
    }
}