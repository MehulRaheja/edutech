import React from "react";
import { useNavigate } from "react-router-dom";

import nextIcon from '../../assets/images/next-icon.png';
import classes from './TestHeader.module.css';

const TestHeader = props => {
    let navigate = useNavigate();
    const navigationHandler = () => {
        navigate('/');
    }
    return (
        <div className={classes.container}>
            <button onClick={() => navigationHandler()} className={classes.button}>
                <img className={classes.img} src={nextIcon} alt="back" />
            </button>
            <span className={classes.container_left}>
                <div className={classes.cont_lft_content}>
                    <p className={classes.cont_lft_content_top}>{props.subject}</p>
                </div>
                <div className={classes.cont_lft_content}>
                    <p className={classes.pee}>{props.topic}</p>
                </div>
            </span>
        </div>
    );
}

export default TestHeader;