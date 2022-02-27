import React, { useState, useEffect, useMemo, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import openSocket from 'socket.io-client';

import Header, { DashHeader } from "../../component/Header/Header";
import Dashboard from "../../component/Dashboard/Dashboard";
import FreeTest from "../../component/FreeTest/FreeTest";
import Footer from "../../component/Footer/Footer";
import './Home.css';
import { getFreeTest, getTest } from "../../store/actions/freeTestActions";
import { getSchools, getClasses, getSubjects } from "../../store/actions/homeUnauthActions";
import { getUserdata, getProfile, getUserTestdata } from "../../store/actions/profileActions";
import Loader from '../../component/UI/Loader/Loader';

const Home = (props) => {
    const [testArray, setTestArray] = useState([]);
    const [load, setLoad] = useState(false);
    const [freeTestArray, setFreeTestArray] = useState({});
    const [schoolArray, setSchoolArray] = useState([]);
    const [stdArray, setStdArray] = useState([]);
    const [subjectArray, setSubjectArray] = useState([]);
    const [profile, setProfile] = useState({});
    const [userTestData, setUserTestData] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('TOKEN'));
    const [userTestArray, setUserTestArray] = useState({});

    const testData = useSelector((state) => state.fetchTest);
    const freeTestData = useSelector((state) => state.fetchFreeTest);
    const schoolData = useSelector((state) => state.schoolsName);
    const stdData = useSelector((state) => state.classesName);
    const subjectData = useSelector((state) => state.subjectsName);
    const {loading} = useSelector((state) => state.fetchFreeTest);
    const profileData = useSelector((state) => state.getProfile);
    const userData = useSelector((state) => state.getUserdata);
    const userTestdata = useSelector((state) => state.getUserTestdata);

    const dispatch = useDispatch();
    let navigate = useNavigate();

    useEffect(() => {
        setLoad(true);
        setTimeout(() => {
            console.log(load);
            setLoad(false);
        }, 1000);
    },[]);

    useLayoutEffect(() => {
        // const token = localStorage.getItem('TOKEN');
        dispatch(getSchools());
        dispatch(getSubjects());
        dispatch(getClasses());
        dispatch(getTest());
        if(token){
            dispatch(getProfile(token));
            dispatch(getUserdata(token));
            dispatch(getUserTestdata(token));
        }
    },[]);

    useEffect(() => {
        if(userTestdata && userTestdata.data) {
            setUserTestArray(userTestdata.data.result);
            console.log(userTestArray);
        }
    },[userTestdata.data]);


    /////////////////////////USE SOCKET.IO WITH BELOW FUNCTION /////////////////////////
    // useEffect(() => {
    //     const socket = openSocket('http://localhost:8000', { transports: ["websocket"] });
    //     socket.on('schools', data => {
    //         console.log('home');
    //         console.log(data);
    //     });
        
    // }, []);

    useEffect(() => {
        setTestArray(testData.data.tests);
        if(testData.loading === false){
            // console.log(testArray);
        }
        setFreeTestArray(freeTestData.data);
        if(freeTestData.loading === false){
            // console.log(freeTestArray);
        }
        setSchoolArray(schoolData.data.schools);
        if(schoolData.loading === false) {
            // console.log(schoolArray);
        }
        setStdArray(stdData.data.stds);
        if(stdData.loading === false) {
            // console.log(stdArray);
        }
        setSubjectArray(subjectData.data.subjects);
        if(subjectData.loading === false) {
            // console.log(subjectArray);
        }
    });

    useEffect(() => {
        if(profileData.loading === false){
            setProfile(profileData.data);
            console.log(profileData.data);
        }
        if(userData.loading === false){
            console.log(userData.data.tests);
            setUserTestData(userData.data.tests);
            console.log(userTestData);
        }

        // window.location.reload();
    },[profileData, userData]);

    const freeTestHandler = (name, std, subject) => {
        // console.log(`${name} ${std} ${subject}`);
        dispatch(getFreeTest( std, subject ));
        // setTimeout(() => {
        //     navigate(`/test/`);
        // }, 2000);
        navigate(`/test/`);
    }

    const profileClickHandler = () => {
        localStorage.removeItem('TOKEN');
        window.location.reload();
        setToken(localStorage.getItem('TOKEN'));
    }

    const output = useMemo(() => {
        // window.location.reload();
        return(
            load ? <Loader /> :
            <div>
                { token ? 
            <div className='dash'>
                <DashHeader
                    name={profile.name ? profile.name : null}
                    makeAction={() => profileClickHandler()}
                />
                <Dashboard
                    subjects={subjectArray}
                    userData={userTestData}
                    userTest={userTestArray} 
                />
            </div>
            : 
            <div>
                <Header 
                    classes={stdArray} 
                    subjects={subjectArray} 
                    schools={schoolArray}
                    name={profile.name ? profile.name : null}
                />
                <main>
                    <FreeTest 
                        classes={stdArray} 
                        subjects={subjectArray} 
                        makeAction={(name, std, subject) => freeTestHandler(name, std, subject)}
                    />
                </main>
            </div> 
            } 
            {/* <h3>Home screen</h3>
            <ul>
                {testArray.map(test => {
                    return (
                        <li key={test.testId}>
                            <Link to={'/test/'+test.testId}>{test.title}</Link>
                        </li>
                    );
                })}
            </ul> */}
            <footer className="Homefooter">
                <Footer />
            </footer>
            </div>
        );
    },[token, userData, profileData, testData, userTestArray, load]);


    return (
        <div>
            {output}
        </div>
    );
}

export default Home;