import React from 'react';

export default class Cell extends React.Component{

    render(){
        return(
            <span style={STYLES.cell}>
            </span>
        );
    }

}

const STYLES = {

    cell: {
        border: '1px solid white',
        width: '10px',
        height: '10px',
        backgroundColor: 'black'
    }

};
