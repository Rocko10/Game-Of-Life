import React from 'react';

export default class Cell extends React.Component{

    render(){
        return(
            <span style={ Object.assign(STYLES.cell, STYLES[this.props.status]) } >
            </span>
        );
    }

}

const STYLES = {

    cell: {
        border: '1px solid blue',
        width: '10px',
        height: '10px',
        display: 'inline-block'
    },

    alive: {
        backgroundColor: 'yellow'
    },

    death: {
        backgroundColor: 'white'
    }


};
