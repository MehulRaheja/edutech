import React, {useState, useEffect} from "react";

import './FreeTest.css';

const FreeTest = props => {
    const [name, setName] = useState('');
    const [std, setStd] = useState('');
    const [subject, setSubject] = useState('');
    const [stdArray, setStdArray] = useState([]);
    const [subjectArray, setSubjectArray] = useState([]);


    useEffect(() => {
        setStdArray(props.classes);
        setSubjectArray(props.subjects);
    });

    const submitHandler = (e) => {
        e.preventDefault();
        // console.log("name"+name);
        // console.log("std:"+std);
        // console.log("subject:"+subject);
        props.makeAction(name, std, subject);
    }

    return (
        <div className="main-container">
            
            <form onSubmit={submitHandler}>
                <ul className="form-container">
                    <li>
                        <h6>Start your free test!</h6>
                    </li>
                    <li>
                        <label htmlFor="name">
                            Name
                        </label>
                        <input type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}>
                        </input>
                    </li>
                    <li>
                        <label htmlFor="name">
                            Class
                        </label>
                        {/* <input type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}>
                        </input> */}
                        <select name="std" id="std" onChange={(e) => setStd(e.target.value)}>
                            <option value=''>select an option</option>
                            {stdArray ? stdArray.map((s, index) => {
                                return <option key={index} value={s.std}>{s.std}</option>
                            }) : null}
                        </select>
                    </li>
                    <li>
                        <label htmlFor="name">
                            Subject
                        </label>
                        {/* <input type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}>
                        </input> */}
                        <select name="subject" id="subject" onChange={(e) => setSubject(e.target.value)}>
                            <option value=''>select an option</option>
                            {subjectArray ? subjectArray.map((s, index) => {
                                return <option key={index} value={s.subject}>{s.subject}</option>
                            }) : null}
                        </select>
                    </li>
                    <li>
                        <button type="submit" className="button primary">Start Test</button>
                    </li>
                </ul>
            </form>
            
        </div>
    );
}

export default FreeTest;