import React, { useState, useEffect } from "react";

import right from '../../assets/images/check-mark.png';
import wrong from '../../assets/images/CROSS_MARK.png';
import classes from './QuestionForm.module.css';

const QuestionForm = props => {
    const [optionA, setOptionA] = useState();
    const [optionB, setOptionB] = useState();
    const [optionC, setOptionC] = useState();
    const [optionD, setOptionD] = useState();

    useEffect(() => {
        setOptionA(props.active === 1 ? <input checked className={classes.opt_inp} type="radio" /> : <input className={classes.opt_inp} type="radio" />);
        setOptionB(props.active === 2 ? <input checked className={classes.opt_inp} type="radio" /> : <input className={classes.opt_inp} type="radio" />);
        setOptionC(props.active === 3 ? <input checked className={classes.opt_inp} type="radio" /> : <input className={classes.opt_inp} type="radio" />);
        setOptionD(props.active === 4 ? <input checked className={classes.opt_inp} type="radio" /> : <input className={classes.opt_inp} type="radio" />);
        console.log(props.active);
    },[props]);

    const selectOptionHandler = (value) => {
        if(value === 'optionA'){
            props.makeAction(1);
            console.log(value);
            setOptionB(<input className={classes.opt_inp} type="radio" />);
            setOptionC(<input className={classes.opt_inp} type="radio" />);
            setOptionD(<input className={classes.opt_inp} type="radio" />);
            setOptionA(<input checked className={classes.opt_inp} type="radio" />);
        }
        if(value === 'optionB'){
            props.makeAction(2);
            console.log(value);
            setOptionA(<input className={classes.opt_inp} type="radio" />);
            setOptionC(<input className={classes.opt_inp} type="radio" />);
            setOptionD(<input className={classes.opt_inp} type="radio" />);
            setOptionB(<input checked className={classes.opt_inp} type="radio" />);
        }
        if(value === 'optionC'){
            props.makeAction(3);
            console.log(value);
            setOptionB(<input className={classes.opt_inp} type="radio" />);
            setOptionA(<input className={classes.opt_inp} type="radio" />);
            setOptionD(<input className={classes.opt_inp} type="radio" />);
            setOptionC(<input checked className={classes.opt_inp} type="radio" />);
        }
        if(value === 'optionD'){
            props.makeAction(4);
            console.log(value);
            setOptionB(<input className={classes.opt_inp} type="radio" />);
            setOptionC(<input className={classes.opt_inp} type="radio" />);
            setOptionA(<input className={classes.opt_inp} type="radio" />);
            setOptionD(<input checked className={classes.opt_inp} type="radio" />);
        }
        if(value === 'clearResp'){
            props.makeAction(0);
            console.log(value);
            setOptionB(<input className={classes.opt_inp} type="radio" />);
            setOptionC(<input className={classes.opt_inp} type="radio" />);
            setOptionA(<input className={classes.opt_inp} type="radio" />);
            setOptionD(<input className={classes.opt_inp} type="radio" />);
        }
    }

    return (
        <div className={classes.test_container}>
            <div className={classes.que_no_container}>
                <p className={classes.que_no}>Question No.{props.qno}</p>
                <div className={classes.marks_notation}>
                    <img className={classes.img} src={right} alt="correct" />
                    <p className={classes.pee}>+4</p>
                    <img className={classes.img} src={wrong} alt="wrong" />
                    <p className={classes.pee}>-1</p>
                </div>
            </div>
            
            <p className={classes.que_desc}>{props.que}</p>
            <form className={classes.opt_form}>
                <div onClick={() => selectOptionHandler('optionA')}>
                    {optionA}
                    <label className={classes.opt_label}>{props.opta}</label>
                </div>
                <div onClick={() => selectOptionHandler('optionB')}>
                    {optionB}
                    <label className={classes.opt_label}>{props.optb}</label>
                </div>
                <div onClick={() => selectOptionHandler('optionC')}>
                    {optionC}
                    <label className={classes.opt_label}>{props.optc}</label>
                </div>
                <div onClick={() => selectOptionHandler('optionD')}>
                    {optionD}
                    <label className={classes.opt_label}>{props.optd}</label>
                </div>
            </form>
            <button
                onClick={() => selectOptionHandler('clearResp')}
                className={classes.button}
            >Clear answer</button>
        </div>
    );
}

export default QuestionForm;