import React from "react";

import QueIndicator from "../QueIndicator/QueIndicator";
import classes from './QuePallete.module.css';

const QuePallete = props => {
    return (
        <div className={classes.pallete_container}>
            <div className={classes.navigate_area}>
                <QueIndicator 
                    makeAction={() => props.makeAction(0)} 
                    value="1" 
                    status={props.display[0] === 0 ? "not_check" : "check"} 
                />
                <QueIndicator 
                    makeAction={() => props.makeAction(1)} 
                    value="2" 
                    status={props.display[1] === 0 ? "not_check" : "check"} 
                />
                <QueIndicator 
                    makeAction={() => props.makeAction(2)} 
                    value="3" 
                    status={props.display[2] === 0 ? "not_check" : "check"} 
                />
                <QueIndicator 
                    makeAction={() => props.makeAction(3)} 
                    value="4" 
                    status={props.display[3] === 0 ? "not_check" : "check"} 
                />
            </div>
            <div className={classes.navigate_area}>
                <QueIndicator 
                    makeAction={() => props.makeAction(4)} 
                    value="5" 
                    status={props.display[4] === 0 ? "not_check" : "check"} 
                />
                <QueIndicator 
                    makeAction={() => props.makeAction(5)} 
                    value="6" 
                    status={props.display[5] === 0 ? "not_check" : "check"} 
                />
                <QueIndicator
                    makeAction={() => props.makeAction(6)} 
                    value="7" 
                    status={props.display[6] === 0 ? "not_check" : "check"} 
                />
                <QueIndicator 
                    makeAction={() => props.makeAction(7)}                 
                    value="8" 
                    status={props.display[7] === 0 ? "not_check" : "check"} 
                />
            </div>
            <div className={classes.navigate_area}>
                <QueIndicator 
                    makeAction={() => props.makeAction(8)} 
                    value="9" 
                    status={props.display[8] === 0 ? "not_check" : "check"} 
                />
                <QueIndicator 
                    makeAction={() => props.makeAction(9)} 
                    value="10" 
                    status={props.display[9] === 0 ? "not_check" : "check"} 
                />
            </div>
        </div>
    );
}

export default QuePallete;