import React from "react";

import classes from  './SubmitButton.module.css';

const SubmitButton = props => {
    return (
        <div className={props.color === 'series' ? classes.submit_button_series : classes.submit_button}>
            <button onClick={props.makeAction} className={ classes.button }>{props.title}</button>
        </div>
    );
}

export default SubmitButton;