import React, { useState, useEffect, useLayoutEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import Footer from "../../component/Footer/Footer";
import { DashHeader } from "../../component/Header/Header";
import Component from "../../component/TestSeriesComponent/Component";
import classes from './TestSeries.module.css';
import { getStartTest } from "../../store/actions/userTestActions";
// import { getUserTestdata } from "../../store/actions/profileActions";
import Loader from '../../component/UI/Loader/Loader';

const TestSeries = props => {
    const [sub , setSub] = useState();
    const [load, setLoad] = useState(false);
    const [name, setName] = useState('');
    const [testArray, setTestArray] = useState([]);
    const [userTestArray, setUserTestArray] = useState({});
    const [token, setToken] = useState(() => localStorage.getItem('TOKEN'));

    const {loading, data} = useSelector((state) => state.getUserdata);
    const userTestdata = useSelector((state) => state.getUserTestdata);

    const {subject} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // useEffect(() => {
    //     if(token){
    //         dispatch(getUserTestdata(token));
    //     }
    // }, []);

    useEffect(() => {
        setLoad(true);
        setTimeout(() => {
            console.log(load);
            setLoad(false);
        }, 500);
    },[]);

    useEffect(() => {
        if(data && data.tests){
            console.log(data.tests);
            let selectedTests = [];
            data.tests.map((t, index) => {
                if(t.subject === subject.substring(1)) {
                    selectedTests.push(t);
                }
            })
            setTestArray(selectedTests);
            console.log(selectedTests);
        }
        
    },[data.tests]);

    useEffect(() => {
        setSub(subject);
        if(userTestdata && userTestdata.data) {
            setUserTestArray(userTestdata.data.result);
            setName(userTestdata.data.name);
            console.log(userTestArray);
            // setLoad(false);
        }
        
        // console.log(sub);
        
    },[]);

    const startTestHandler = (testId) => {
        dispatch(getStartTest( testId, token ));
        navigate(`/test/`);
    }

    const compareTests = () => {
        // console.log(testArray);
        const arr = testArray.map((t, index) => {
            let comp = (<div key={index} className={classes.test}>
                <Component  topic={t.topic} subject={t.subject} id={t._id} difficulty={t.difficulty} makeAction={() => startTestHandler(t._id) } />
            </div>);
            console.log(userTestArray.tests);
            userTestArray.tests && userTestArray.tests.forEach(element => {
                console.log(element.testId, typeof element.testId);
                console.log(t._id, typeof t._id);
                console.log(element.testId === t._id);
                if(element.testId === t._id){
                    comp = (<div key={index} className={classes.test}>
                        <Component  topic={t.topic} subject={t.subject} id={t.id} marks={element.marks} />
                    </div>);
                }
            })  
            
            return comp;
        })
        return arr;
    }

    return (
        <div>
            { load === true ? <Loader /> : 
                <div>
                    <DashHeader 
                        name={name ? name : null}
                    />
                    <div className={classes.container}>
                        <h3>{`${subject.substring(1)} Test Series`}</h3>
                        <div className={classes.test_container}>
                            { compareTests().map(c => {
                                // console.log(c)
                                return c;
                            }) }
                            {/* <div className={classes.test}>
                                <Component />
                            </div>
                            <div className={classes.test}>
                                <Component />
                            </div>
                            <div className={classes.test}>
                                <Component />
                            </div> */}
                        </div>
                        
                    </div>
                    <Footer />
                </div>
            }
        </div>
    );
};

export default TestSeries;