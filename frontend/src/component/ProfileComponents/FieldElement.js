import React from "react";

import classes from './FieldElement.module.css';

const FieldElement = props => {

    return (
        <div className={props.order === 'odd' ? classes.odd : classes.even}>
            <div className={classes.left}>
                <p>{props.title}</p>
            </div>
            <div className={classes.right}>
                <p>{props.val}</p>
            </div>
        </div>
    );
}

export default FieldElement;