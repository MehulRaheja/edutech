import React from "react";

import classes from './QueIndicator.module.css';

const QueIndicator = props => {

    return (
        <button 
            onClick={() => props.makeAction()} 
            className={props.status === "check" ?  classes.container : classes.container_notcheck}
        >{props.value}</button>
    );
}

export default QueIndicator;