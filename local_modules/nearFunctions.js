'use strict';

module.exports = function(TOTAL_LENGTH){

    const LENGTH = TOTAL_LENGTH;
    const SIDE = Math.sqrt(LENGTH);
    const LEFT_VAL = SIDE - 1;

    /* constraints */
    function isFirstRow(position){

        return (position < SIDE);

    }

    function isLastRow(position){

        const LAST_ROW_FIRST = (SIDE - 1) * SIDE;

        return position >= LAST_ROW_FIRST;

    }

    function isFirst(position){

        return position === 0;

    }

    function isLast(position){

        return position === ((SIDE * SIDE) - 1);

    }
    /* constraints */

    function getTopTop(position){

        if(isFirstRow(position)){
            return null;
        }

        return position - SIDE;

    }

    function getTopRight(position){

        if(isFirstRow(position)){
            return null;
        }

        let posible = (position - SIDE) + 1;

        if((posible % SIDE) !== 0){

            return posible;

        }

        return null;

    }

    function getTopLeft(position){

        if(isFirstRow(position)){
            return null;
        }

        let posible = (position - SIDE) - 1;

        if(posible < 0){
            return null;
        }

        if((posible % SIDE) === LEFT_VAL){
            return null;
        }

        return posible;

    }

    function getBottomBottom(position){

        if(isLastRow(position)){
            return null;
        }

        return position + SIDE;

    }

    function getBottomRight(position){

        if(isLastRow(position)){
            return null;
        }

        let posible = (position + SIDE) + 1;

        if(posible % SIDE !== 0){

            return posible;

        }

        return null;

    }

    function getBottomLeft(position){

        if(isLastRow(position)){
            return null;
        }

        let posible = (position + SIDE) - 1;

        if(posible % SIDE === LEFT_VAL){
            return null;
        }

        return posible;

    }

    function getLeft(position){

        if(isFirst(position)){
            return null;
        }

        let posible = position - 1;

        if((posible % SIDE) === LEFT_VAL){

            return null;

        }

        return posible;

    }

    function getRight(position){

        if(isLast(position)){
            return null;
        }

        let posible = position + 1;

        if((posible % SIDE) !== 0){

            return posible;

        }

        return null;

    }

    function getNears(position){

        let nears = [];
        let posible;

        if((posible = getTopTop(position)) !== null){
            nears.push(posible);
        }

        if((posible = getTopRight(position)) !== null){
            nears.push(posible);
        }

        if((posible = getTopLeft(position)) !== null){
            nears.push(posible);
        }

        if((posible = getBottomBottom(position)) !== null){
            nears.push(posible);
        }

        if((posible = getBottomRight(position)) !== null){
            nears.push(posible);
        }

        if((posible = getBottomLeft(position)) !== null){
            nears.push(posible);
        }

        if((posible = getLeft(position)) !== null){
            nears.push(posible);
        }

        if((posible = getRight(position)) !== null){
            nears.push(posible);
        }

        return nears;

    }

    return {
        getNears
    };


}
