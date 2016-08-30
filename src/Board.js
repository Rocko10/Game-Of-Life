import React from 'react';
import Cell from './Cell';
import getNears from './../lab/general';
var mod = require('./../lab/general')(81);

const LENGTH_BOARD = 81;
const SIDE = Math.sqrt(LENGTH_BOARD);
const LEFT_VAL = SIDE - 1;

/* TODO Setup the game board, by clicking a square, toggle the status of the Cell */

export default class Board extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            cells: []
        }
        this.updateBoard = this.updateBoard.bind(this);
        this.startGame = this.startGame.bind(this);
        this.stopGame = this.stopGame.bind(this);
    }

    componentDidMount(){

        this.fillBoard();

    }

    fillBoard(){

        let cells = [];

        for(let i = 0; i < LENGTH_BOARD; i++){

            let cellStatus = Math.floor(Math.random() * 2) === 1 ? 'alive' : 'death';

            cells.push(<Cell key={i} status={cellStatus}/>);

        }

        this.setState({cells});

    }

    gameLoop(gameStatus){

        if(gameStatus === 'start'){
            let timer = setInterval(this.updateBoard, 1000);
            sessionStorage.setItem('timer', timer);
        }
        if(gameStatus === 'stop'){
            let timer = sessionStorage.getItem('timer');
            clearInterval(timer);
        }

    }

    updateBoard(){

        let tmpCells = this.state.cells;

        for(let i = 0; i < tmpCells.length; i++){

            this._gameLogic(tmpCells, i);

        }

        this.setState({
            cells: tmpCells
        });
    }

    _gameLogic(tmpCells, position){

        let nearsValues = mod.getNears(position).map(pos => tmpCells[pos].props.status);

        if(tmpCells[position].props.status === 'death'){

            if(this._willLive(nearsValues)){
                tmpCells.splice(position, 1, <Cell key={position} status='alive'/>);
            }

        }
        else if(tmpCells[position].props.status === 'alive'){

            if(this._willDie(nearsValues)){
                tmpCells.splice(position, 1, <Cell key={position} status='death'/>);
            }

        }

    }

    _willLive(nearsValues){

        let count = 0;

        for(let val of nearsValues){

            if(val === 'alive'){
                count++;
            }

        }

        return count === 3;

    }

    _willDie(nearsValues){

        let count = 0;

        for(let val of nearsValues){

            if(val === 'alive'){
                count++;
            }

        }

        return (count !== 2) && (count !== 3);

    }

    startGame(){

        this.gameLoop('start');

    }

    stopGame(){

        this.gameLoop('stop');

    }

    render(){

        return(
            <div>
                <button onClick={this.startGame}>Start</button>
                <button onClick={this.stopGame}>Stop</button>
                <div style={STYLES.board}>
                    {this.state.cells}
                </div>
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
