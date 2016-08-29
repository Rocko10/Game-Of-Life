import React from 'react';
import Cell from './Cell';

const LENGTH_BOARD = 36;
const SIDE = Math.sqrt(LENGTH_BOARD);

export default class Board extends React.Component{

    constructor(props, LENGTH_BOARD){
        super(props);
        this.state = {
            cells: []
        }
        this.updateBoard = this.updateBoard.bind(this);
    }

    componentDidMount(){
        this.fillBoard();
        this.gameLoop();
    }

    fillBoard(){

        let cells = [];

        for(let i = 0; i < LENGTH_BOARD; i++){

            let cellStatus = Math.floor(Math.random() * 2) === 1 ? 'alive' : 'death';

            cells.push(<Cell key={i} status={cellStatus}/>);

        }

        this.setState({cells});

    }

    gameLoop(){

        setInterval(this.updateBoard, 3000);

    }

    updateBoard(){

        let tmpCells = this.state.cells;

        for(let i = 0; i < tmpCells.length; i++){

            if(tmpCells[i].props.status === 'alive'){
                tmpCells.splice(i, 1, <Cell key={i} status='death'/>);
            }

            else if(tmpCells[i].props.status === 'death'){
                tmpCells.splice(i, 1, <Cell key={i} status='alive'/>);
            }

        }

        this.setState({
            cells: tmpCells
        });
    }

    render(){

        return(
            <div style={STYLES.board}>
                {this.state.cells}
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
