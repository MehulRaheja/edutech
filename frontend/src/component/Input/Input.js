import React from "react";

import classes from './Input.module.css';

const input = props => {
    let inputElement = null;

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={classes.input}
                placeholder={props.placeholder}
                type={props.type}
                onChange={(e) => {props.makeChange(e.target.value)}}
                />
            break;
        case ('image'):
            inputElement = <input
                className={classes.input}
                placeholder={props.placeholder}
                type={props.type}
                onChange={(e) => {props.makeChange(e.target.files[0])}}
                />
            break;
        case ('textarea'):
            inputElement = <textarea
                className={classes.input}
                placeholder={props.placeholder}
                onChange={(e) => {props.makeChange(e.target.value)}}
                />
            break;
        case ('t'):
            inputElement = <textarea
                className={classes.input}
                placeholder={props.placeholder}
                onChange={(e) => {props.makeChange(e.target.value)}}
                />
            break;
        case ('select'):
            inputElement = <select
                className={classes.select}
                placeholder={props.placeholder}
                onChange={(e) => {props.makeChange(e.target.value)}}
            >
                <option value=''>select an option</option>
                {props.data ? props.data.map((s, index) => {
                    return <option key={index} value={s}>{s}</option>
                }) : null}
            </select>
        break;
    
        default:
            inputElement = <input
                className={classes.input}
                placeholder={props.placeholder}
                type={props.type}
             />
            break;
    }

    return (
        <div className={classes.container}>
            <label className={classes.label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default input;