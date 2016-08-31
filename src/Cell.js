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
        border: '1px solid #222222',
        height: '10px',
        width: '10px',
        cursor: 'pointer',
        borderRadius: '100%',
        display: 'inline-block'
    },

    alive: {
        backgroundColor: '#00D8FF'
    },

    death: {
        backgroundColor: '#222222'
    }


};
