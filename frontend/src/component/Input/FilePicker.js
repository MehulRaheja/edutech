import React from "react";

import classes from './FilePicker.module.css';

const FilePicker = props => (
    <div className="input">
        <label className={classes.label} htmlFor={props.id}>{props.label}</label>
        <input
            className={[
                !props.valid? classes.invalid : classes.valid,
                props.touched ? classes.touched : classes.untouched
            ].join(' ')}
            type='file'
            id={props.id}
            onChange={e => props.onChange(props.id, e.target.value, e.target.files)}
            onBlur={props.onBlur}
        />
    </div>
);

export default FilePicker;
