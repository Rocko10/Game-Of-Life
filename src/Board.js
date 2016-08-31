import React from 'react';
import Cell from './Cell';
var nearFunctions = require('./../local_modules/nearFunctions')(1681);

const LENGTH_BOARD = 1681;
const SIDE = Math.sqrt(LENGTH_BOARD);
const LEFT_VAL = SIDE - 1;
const SPEED = 500;

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
            let timer = setInterval(this.updateBoard, SPEED);
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

        let nearsStatus = nearFunctions.getNears(position).map(pos => tmpCells[pos].props.status);

        if(this._mustLive(tmpCells[position], nearsStatus)){

            return this._replaceCell(position, 'alive');

        }

        if(this._mustDie(tmpCells[position], nearsStatus)){

            return this._replaceCell(position, 'death');

        }

        return tmpCells[position];

    }

    _mustLive(cell, nearsStatus){

        return (cell.props.status === 'death' && this._checkIfWillLive(nearsStatus));

    }

    _mustDie(cell, nearsStatus){

        return (cell.props.status === 'alive' && this._checkIfWillDie(nearsStatus));

    }

    _checkIfWillLive(nearsStatus){

        let count = 0;

        for(let val of nearsStatus){

            if(val === 'alive'){
                count++;
            }

        }

        return count === 3;

    }

    _checkIfWillDie(nearsStatus){

        let count = 0;

        for(let val of nearsStatus){

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
            <div style={STYLES.container}>
                <h1 style={STYLES.pull}>The Game of Life</h1>
                <p style={STYLES.pull}>Created by John Horton Conway</p>
                <p style={STYLES.pull}>This implementation was made by Marco Antonio Nuñez Perez</p>
                <br/>
                <button style={STYLES.btn} onClick={this.startGame}>Start</button>
                <button style={STYLES.btn} onClick={this.stopGame}>Stop</button>
                <button style={STYLES.btn} onClick={this.randomBoard}>Random Board</button>
                <button style={STYLES.btn} onClick={this.initBoard}>Clear Board</button>
                <div style={STYLES.board}>
                    {this.state.cells}
                </div>
            </div>
        );
    }

}

const STYLES = {

    board: {
        lineHeight: '13px',
        width: '500px',
        height: '500px',
        margin: 'auto',
        marginTop: '5px'
    },
    btn: {
        padding: '4px 15px',
        backgroundColor: '#2196F3',
        border: '1px solid #B2EBF2',
        color: 'white',
        fontWeight: 'bold',
        marginRight: '5px',
        cursor: 'pointer'
    },
    container: {
        margin: 'auto',
        textAlign: 'center',
        marginTop: '-22px'
    },
    pull: {
        marginBottom: '-12px'
    }

};
