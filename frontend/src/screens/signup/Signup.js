import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import classes from './Signup.module.css';
import Input from "../../component/Input/Input";
import SubmitButton from "../../component/Button/SubmitButton";
import { postSignup } from "../../store/actions/authActions";
import Footer from "../../component/Footer/Footer";
import { HeaderStatic } from "../../component/Header/Header";
import { validator } from "../../utils/validator";
import { getSchools, getClasses } from "../../store/actions/homeUnauthActions";
// import { generateBase64FromImage } from '../../utils/image';
// import FilePicker from '../../component/Input/FilePicker';
// import Image from '../../component/Image/Image';

const Signup = props => {
    const [email, setEmail ] = useState('');
    const [fullName, setFullName ] = useState('');
    const [std, setStd ] = useState('');
    const [school, setSchool ] = useState('');
    const [password, setPassword ] = useState('');
    const [rePassword, setRePassword ] = useState('');
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState('');
    const [schoolArray, setSchoolArray] = useState([]);
    const [stdArray, setStdArray] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const schoolData = useSelector((state) => state.schoolsName);
    const stdData = useSelector((state) => state.classesName);

    useEffect(() => {
        if(!schoolData.data.schools && !stdData.data.stds) {
            dispatch(getSchools());
            dispatch(getClasses());
        }
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setSchoolArray(() => {
                if(schoolData && schoolData.data.schools) {
                    const schools = schoolData.data.schools.map(school => {
                        return school.school;
                    })
                    return schools;
                }
            });
            if(schoolData.loading === false) {
                // console.log(schoolArray);
            }
            setStdArray(() => {
                if(stdData && stdData.data.stds){
                    const stds = stdData.data.stds.map(std => {
                        return std.std;
                    })
                    return stds;
                }
            });
            if(stdData.loading === false) {
                // console.log(stdArray);
            }
        }, 1000);
    }, [schoolData, stdData]);

    const uploadImage = (value) => {
        setFile(value);
        setFileName(value.name);
    }

    const signupHandler = () => {
        console.log(email);
        console.log(fullName);
        console.log(std);
        console.log(school);
        console.log(password);
        console.log(rePassword);
        if (!validator("email", email)) {
            alert("Please enter a valid email address");
        }
        if (!validator("name", fullName)) {
            alert("Please enter your full name");
        }
        if (!validator("password", password)) {
            alert("Password must be 5 to 10 characteres long.");
        }
        if (password !== rePassword){
            alert("Re entered password did not match with the password.")
        }

        if(password === rePassword && 
            validator("password", password) && 
            validator("name", fullName) && 
            validator("email", email) &&
            password === rePassword
        ) {
            let dataArray = [ email, password, 'student', fullName, school, std, file, fileName ];
            dispatch(postSignup(dataArray));
            navigate('/signin/');
        }
        
    }

    return (
        <div className={classes.main_container}>
            <HeaderStatic />
            <div className={classes.container}>
                <p>SignUp</p>
                <div className={classes.input1}>
                    <Input 
                        elementType="input"
                        label="E-mail: "
                        placeholder="Enter your e-mail address"
                        type="email"
                        makeChange={(value) => {setEmail(value)}}
                    />
                </div>
                <div className={classes.input2}>
                    <Input 
                        elementType="input"
                        label="Full Name: "
                        placeholder="Enter your full Name"
                        type="text"
                        makeChange={(value) => {setFullName(value)}}
                    />
                </div>
                <div className={classes.input3}>
                    <Input 
                        elementType="select"
                        label="Class: "
                        placeholder="Select your Class"
                        data={stdArray}
                        makeChange={(value) => {setStd(value)}}
                    />
                </div>
                <div className={classes.input4}>
                    <Input 
                        elementType="select"
                        label="School: "
                        placeholder="Select your School"
                        data={schoolArray}
                        makeChange={(value) => {setSchool(value)}}
                    />
                </div>
                <div className={classes.input5}>
                    <Input 
                        elementType="input"
                        label="Password: "
                        placeholder="Create a Password"
                        type="password"
                        makeChange={(value) => {setPassword(value)}}
                    />
                </div>
                <div className={classes.input5}>
                    <Input 
                        elementType="input"
                        label="Password: "
                        placeholder="Re-enter your Password"
                        type="password"
                        makeChange={(value) => {setRePassword(value)}}
                    />
                </div>
                <div>
                    <Input 
                        elementType="image"
                        label="Image: "
                        placeholder="Select Image"
                        type="file"
                        makeChange={(value) => { uploadImage(value) } }
                    />
                </div>
                <div className={classes.button}>
                    <SubmitButton 
                        title="SignUp" 
                        makeAction={() => signupHandler()}
                    />
                </div>
                <Link className={classes.link} to='/signin'>Log in here...</Link>
            </div>
            <div className={classes.footer}>
                <Footer />
            </div>
        </div>
        
    );
}

export default Signup;