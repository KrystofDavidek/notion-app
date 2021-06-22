import React from 'react';
import ListView from "./ListView/ListView";
import {BoardData, BoardView} from "./BoardView/BoardView";

export default class PageContent extends React.Component {
    render() {
        const boards: BoardData[] = [{id: 0, title:"s"},{id: 1, title:"s"}]
        return <div>
            {/*<ListView/>*/}
            <BoardView boards={boards}/>
        </div>
    }
}