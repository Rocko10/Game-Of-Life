import React from 'react';

export default class Cell extends React.Component{

    render(){
        return(
            <span
                onClick={() => {
                    this.props.toggleCellStatus(this.props.position)
                }}
                style={Object.assign(STYLES.cell, STYLES[this.props.status])}
            >
            </span>
        );
    }

}

const STYLES = {

    cell: {
        border: '1px solid blue',
        width: '10px',
        height: '10px',
        display: 'inline-block',
        cursor: 'pointer'
    },

    alive: {
        backgroundColor: 'red'
    },

    death: {
        backgroundColor: 'white'
    }


};
