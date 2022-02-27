import React from "react";

import classes from './Component.module.css';

const Component = props => {

    return (
        <div className={classes.container}>
            <div className={classes.top}>
                <p className={classes.text}>{props.topic}</p>
                {props.marks ? null : <button className={classes.button} onClick={() =>props.makeAction()}>Start Test</button>}
                
            </div>
            <div className={classes.marks_container}>
                <p className={classes.marks}>{props.marks ? `Score: ${props.marks}/40` : `difficulty: ${props.difficulty}`}</p>
            </div>
            <div className={classes.bar_container}>
                <div className={ props.marks > 0 ? classes.bar_active : classes.bar }></div>
                <div className={ props.marks > 4 ? classes.bar_active : classes.bar}></div>
                <div className={ props.marks > 8 ? classes.bar_active : classes.bar}></div>
                <div className={ props.marks > 12 ? classes.bar_active : classes.bar}></div>
                <div className={ props.marks > 16 ? classes.bar_active : classes.bar}></div>
                <div className={ props.marks > 20 ? classes.bar_active : classes.bar}></div>
                <div className={ props.marks > 24 ? classes.bar_active : classes.bar}></div>
                <div className={ props.marks > 28 ? classes.bar_active : classes.bar}></div>
                <div className={ props.marks > 32 ? classes.bar_active : classes.bar}></div>
                <div className={ props.marks > 36 ? classes.bar_active : classes.bar}></div>
            </div>
            <div className={classes.bottom}>
                <p className={classes.pee}>Attempted on dec 12</p>
            </div>
        </div>
    );
};

export default Component;