import React from 'react';
import Cell from './Cell';

export default class Board extends React.Component{

    constructor(props, LENGTH_BOARD){
        super(props);
        this.LENGTH_BOARD = LENGTH_BOARD;
    }

    fillBoard(){

        this.LENGTH_BOARD = 36;
        const cells = [];
        const SIDE = Math.sqrt(this.LENGTH_BOARD);

        for(let i = 0; i < this.LENGTH_BOARD; i++){
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
        width: '12%',
        margin: 'auto',
        textAlign: 'center',
        lineHeight: '10px'
    }

};
