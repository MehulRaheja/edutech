import React, { useState, useEffect, useLayoutEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import QuePallete from '../../component/QuePallete/QuePallete';
import QuestionForm from '../../component/QuestionForm/QuestionForm';
import TestHeader from '../../component/Header/TestHeader';
import TestFooter from '../../component/Footer/TestFooter';
import classes from './Test.module.css';
import { submitUserTest } from "../../utils/api";
import { getUserdata, getProfile, getUserTestdata } from "../../store/actions/profileActions";
import Loader from '../../component/UI/Loader/Loader';

const Test = (props) => {
    const [testId, setTestId] = useState('');
    const [testload, setTestload] = useState(true);
    const [subject, setSubject] = useState('');
    const [topic, setTopic] = useState('');
    const [currentQue, setCurrentQue] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [responseArray, setResponseArray] = useState(new Array(10).fill(0));
    const [token, setToken] = useState(localStorage.getItem('TOKEN'));

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const {loading, data} = useSelector((state) => token ? state.fetchStartTest : state.fetchFreeTest);

    useLayoutEffect(() => {
        if(token){
            dispatch(getProfile(token));
            dispatch(getUserdata(token));
            dispatch(getUserTestdata(token));
        }
    },[]);

    useEffect(() => {
        console.log(loading);
        console.log(data);
    },[data, responseArray]);

    useEffect(() => {
        setTimeout(() => {
            if(loading === false) {
                setTestId(data.testId);
                setSubject(data.subject);
                setTopic(data.topic);
                setQuestions(data.questions);
                setTestload(false);
                console.log(questions);
            }
        }, 1000);
    },[data, responseArray]);

    const navigateHandler  = (action) => {
        if (action === 'next' && currentQue < 9 ){
            setCurrentQue(currentQue + 1);
        }
        if (action === 'prev' && currentQue > 0 ){
            setCurrentQue(currentQue - 1);
        }
        // if (action === 'clear'){
        //     let respArr = responseArray;
        //     respArr[currentQue] = 0;
        //     setResponseArray(respArr);
        //     console.log(action);
        //     console.log(respArr);
        //     console.log(responseArray);
        // }
    }

    const responseHandler = (value) => {
        let respArr = responseArray;
        respArr[currentQue] = value;
        setResponseArray(respArr);
        console.log(value);
        console.log(respArr);
        console.log(responseArray);
    }

    const submitHandler = () => {
        // console.log('test submitted');
        const newArray = responseArray.map(entry => {
            let res = '';
            if(entry === 1){
                res = 'A';
            }
            if(entry === 2){
                res = 'B';
            }
            if(entry === 3){
                res = 'C';
            }
            if(entry === 4){
                res = 'D';
            }
            return res;
        })
        const result = questions.reduce((prevVal, question, index) => {
            if(responseArray[index] === 0){
                return prevVal;
            }
            if(responseArray[index] === 1) {
                if(question.ans === 'A') {
                    return prevVal + 4;
                } else {
                    return prevVal - 1; 
                }
            }
            if(responseArray[index] === 2) {
                if(question.ans === 'B') {
                    return prevVal + 4;
                } else {
                    return prevVal - 1; 
                }
            }
            if(responseArray[index] === 3) {
                if(question.ans === 'C') {
                    return prevVal + 4;
                } else {
                    return prevVal - 1; 
                }
            }
            if(responseArray[index] === 4) {
                if(question.ans === 'D') {
                    return prevVal + 4;
                } else {
                    return prevVal - 1; 
                }
            }
        }, 0 );
        submitUserTest(testId, subject, newArray, token);
        console.log(`Test Score: ${result}`);
        navigate('/');
    }

    // const { id } = useParams();

    // useEffect(() => {
    //     testPaper();
    //     const getData = async() => {
    //         // const tests = await Axios.get("http://localhost:8000");
    //         fetch(`http://localhost:8000/post/${id}`, {
    //             method: 'GET'
    //         })
    //             .then(res => {
    //                 console.log(res.status);
    //                 return res.json();
    //             })
    //             .then(resData => {
    //                 console.log('test material'+resData.tests);
    //                 // setTestArray(resData.tests);
    //                 // return resData.tests;
    //             })
    //             .catch(err => console.log(err));
    //     }
    //     getData();
    //     // setTestArray(() => {
    //     //     getData();
    //     //     console.log(testArray);
    //     // });
    //     // console.log("this is the data " + testArray);

    //     return () => {
    //         // console.log("this is the data " + testArray);
    //     };
    // },[]);

    return (
        testload === true ? <Loader /> :
        <div className={classes.main_container}>
            <div>
                <TestHeader subject={subject} topic={topic}/>
            </div>
            <div className={classes.test_area}>
                <QuestionForm 
                    qno={currentQue + 1}  
                    que={questions[currentQue].que}
                    opta={questions[currentQue].optA}
                    optb={questions[currentQue].optB}
                    optc={questions[currentQue].optC}
                    optd={questions[currentQue].optD}
                    active={responseArray[currentQue]}
                    makeAction={(value) => {responseHandler(value)}}
                />
                <QuePallete 
                    makeAction={(val) => {
                        console.log(val);
                        setCurrentQue(val);
                    }}
                    display={responseArray}
                />
            </div>
            <footer className={classes.footer}>
                <TestFooter
                    makeAction={(action) => {navigateHandler(action)}}
                    submitAction={() => submitHandler()}
                />
            </footer>
        </div>
    );
}

export default Test;