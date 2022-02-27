import React, { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

import classes from "./Dashboard.module.css";
import TestSeriesElement from "./TestSeriesElement/TestSeriesElement";

const Dashboard = props => {
    // const [ subjects, setSubjects] = useState([]);
    // const [ tests, setTests] = useState({});

    const navigate = useNavigate();

    // useEffect(() => {
    //     setSubjects(() => {
    //         let subs = props.subjects.map(sub => {
    //             return sub.subject;
    //         });
    //         return subs;
    //     });
    //     setTests(props.userData);
    // }, [])
    // console.log(props.userData, props.userTest);

    const testSeriesHandler = (sub) => {
        navigate(`/series:${sub}`);
    };

    return (
        <div className={classes.main_container}>
            <h3 className={classes.heading}>Your Recent Test Series</h3>
            <div className={classes.container}>
                {props.subjects ? props.subjects.map((sub, index) => {
                    return (
                        <TestSeriesElement
                            key={index} 
                            subject={sub.subject} 
                            tests={props.userData}
                            attemptedTest={props.userTest}
                            makeAction={() => testSeriesHandler(sub.subject)}
                        /> 
                    )
                }) : null}
            </div>
        </div>
        
    );
}

export default Dashboard;