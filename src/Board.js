import React from 'react';
import Cell from './Cell';

export default class Board extends React.Component{

    fillBoard(){

        let cells = [];

        for(let i = 0; i < 100; i++){
            cells.push(<Cell key={i}/>);
        }

        return cells;

    }

    render(){
        return(
            <div style={STYLES.board}>
                {this.fillBoard()}
            </div>
        );
    }

}

const STYLES = {

    board: {
        border: '1px solid black',
        width: '500px',
        height: '500px'
    }

};
