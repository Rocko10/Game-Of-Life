import React from 'react';
import Cell from './Cell';
var nearFunctions = require('./../local_modules/nearFunctions')(81);

const LENGTH_BOARD = 81;
const SIDE = Math.sqrt(LENGTH_BOARD);
const LEFT_VAL = SIDE - 1;

export default class Board extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            cells: []
        }

        this._bindMethods();

    }

    _bindMethods(){

        this.updateBoard = this.updateBoard.bind(this);
        this.startGame = this.startGame.bind(this);
        this.stopGame = this.stopGame.bind(this);
        this.toggleCellStatus = this.toggleCellStatus.bind(this);
        this.randomBoard = this.randomBoard.bind(this);
        this.initBoard = this.initBoard.bind(this);

    }

    componentDidMount(){

        this.initBoard();

    }

    initBoard(){

        let cells = [];

        for(let i = 0; i < LENGTH_BOARD; i++){

            cells.push(this._replaceCell(i, 'death'));

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
        let newCells = [];

        for(let i = 0; i < tmpCells.length; i++){
            newCells.push(this._getNewCell(tmpCells, i));
        }

        this.setState({
            cells: newCells
        });
    }

    _getNewCell(tmpCells, position){

        let nearsValues = nearFunctions.getNears(position).map(pos => tmpCells[pos].props.status);

        if(this._mustLive(tmpCells[position], nearsValues)){

            return this._replaceCell(position, 'alive');

        }

        if(this._mustDie(tmpCells[position], nearsValues)){

            return this._replaceCell(position, 'death');

        }

        return tmpCells[position];

    }

    _mustLive(cell, nearsValues){

        return (cell.props.status === 'death' && this._checkIfWillLive(nearsValues));

    }

    _mustDie(cell, nearsValues){

        return (cell.props.status === 'alive' && this._checkIfWillDie(nearsValues));

    }

    _checkIfWillLive(nearsValues){

        let count = 0;

        for(let val of nearsValues){

            if(val === 'alive'){
                count++;
            }

        }

        return count === 3;

    }

    _checkIfWillDie(nearsValues){

        let count = 0;

        for(let val of nearsValues){

            if(val === 'alive'){
                count++;
            }

        }

        if(count === 2 || count === 3){
            return false;
        }

        return true;

    }

    _replaceCell(position, status){

        return (
            <Cell
                key={position}
                position={position}
                status={status}
                toggleCellStatus={this.toggleCellStatus}
            />
        );

    }

    startGame(){

        this.gameLoop('start');

    }

    stopGame(){

        this.gameLoop('stop');

    }

    toggleCellStatus(position){

        let tmpCells = this.state.cells;
        let cellStatus = tmpCells[position].props.status;

        if(cellStatus === 'alive'){
            tmpCells.splice(position, 1, this._replaceCell(position, 'death'));
        }

        if(cellStatus === 'death'){
            tmpCells.splice(position, 1, this._replaceCell(position, 'alive'));
        }

        this.setState({
            cells: tmpCells
        });

    }

    randomBoard(){

        let cells = [];

        for(let i = 0; i < LENGTH_BOARD; i++){

            let cellStatus = Math.floor(Math.random() * 2) === 1 ? 'alive' : 'death';

            cells.push(this._replaceCell(i, cellStatus));

        }

        this.setState({cells});

    }

    render(){

        return(
            <div>
                <button onClick={this.initBoard}>Clear Board</button>
                <button onClick={this.randomBoard}>Random Board</button>
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
