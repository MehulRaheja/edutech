import React from "react";

import classes from './TopElement.module.css';

const TopElement = props => {

    return (
        <div className={classes.container}>
            <div className={classes.top}>
                {/* <img /> */}
                <p className={props.status === "active" ? classes.pee_active : classes.pee}>{props.title}</p>
            </div>
            <div className={props.status === "active" ? classes.bottom_active :classes.bottom}></div>
        </div>
    );
}

export default TopElement;