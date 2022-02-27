import React from "react";

import classes from './AddField.module.css';

const AddField = props => {

    return (
        <div className={props.order === 'odd' ? classes.odd : classes.even}>
            <div className={classes.left}>
                <p>{props.title}</p>
            </div>
            <div>
                <input defaultValue="Mehul" className={classes.right}/>
            </div>
        </div>
    );
}

export default AddField;