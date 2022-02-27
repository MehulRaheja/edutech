import React from "react";

import classes from './NavigateButton.module.css';

const NavigationButton = props => {
    return (
        <div className={classes.navigate_button}>
            <button onClick={props.makeAction} className={classes.button} >{props.title}</button>
        </div>
    );
}

export default NavigationButton;