import React from "react";

import NavigateButton from '../Button/NavigateButton';
import SubmitButton from '../Button/SubmitButton';
import classes from './TestFooter.module.css';

const TestFooter = props => {
    return (
        <div className={classes.footer_container}>
            <div className={classes.footer_left}>
                <div className={classes.button_left}>
                    <NavigateButton 
                        makeAction={() => {
                            props.makeAction('prev');
                            // console.log('prev');
                        }} 
                        title="Previous Question"
                    />
                    <div className={classes.space}></div>
                    {/* <NavigateButton
                        makeAction={() => {
                            props.makeAction('clear');
                        }} 
                        title="Clear response" 
                    /> */}
                </div>
                <div className={classes.button_right}>
                    <NavigateButton
                        makeAction={() => {
                            props.makeAction('next');
                        }} 
                        title="Next Question"
                    />
                </div>
            </div>
            <div className={classes.footer_right}>
                <SubmitButton 
                    makeAction={() => {
                        props.submitAction();
                    }} 
                    title="Submit"
                    color='test'
                />
            </div>
        </div>
    );
}

export default TestFooter;