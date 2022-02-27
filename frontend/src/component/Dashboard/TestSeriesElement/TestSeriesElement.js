import React, { useState, useEffect } from "react";

import classes from './TestSeriesElement.module.css';
import icon from '../../../assets/images/brandLogo.jpg';
import SubmitButton from '../../Button/SubmitButton';

const TestSeriesElement = props => {
    const [testCount, setTestCount ] = useState(0);
    const [attemptCount, setAttemptCount ] = useState(0);

    useEffect(() => {
        if(props.subject && props.tests) {setTestCount(() => {
            // console.log(props.tests);
            // console.log(props.subject);
            let count = 0;
            let arr = props.tests.map(test => {
                // console.log(test);
                if(test.subject === props.subject) {
                   count += 1;
                }
                return test.subject;
            })
            return count;
        })}
        if(props.subject && props.attemptedTest) {setAttemptCount(() => {
            let count = 0;
            let arr = props.attemptedTest.tests.map(test => {
                if(test.subject === props.subject){
                    count += 1;
                }
                return test.subject;
            })
            return count;
        })}
        // console.log(testCount);
    },[props.subject, props.tests, props.attemptedTest]);
    return (
        <div className={classes.container}>
            <div className={classes.iconWrap}>
                <img className={classes.icon} src={icon} alt="icon" />
            </div>
            <div className={classes.textContainer}>
                <p> {props.subject} Test Series</p>
                <p>{ `${attemptCount}/${testCount} Tests`}</p>
            </div>
            <div className={classes.buttonWrap}>
                <SubmitButton 
                    title="Go to Test Series" 
                    color='series'
                    makeAction = { () => props.makeAction()}
                />
            </div>
        </div>
    );
}

export default TestSeriesElement;