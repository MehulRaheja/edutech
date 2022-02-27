import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
 
import classes from './Signin.module.css';
import Input from "../../component/Input/Input";
import SubmitButton from "../../component/Button/SubmitButton";
import { postSignin } from "../../store/actions/authActions";
import Footer from "../../component/Footer/Footer";
import { HeaderStatic } from "../../component/Header/Header";
import { validator } from "../../utils/validator";
import { getTest } from "../../store/actions/freeTestActions";
// import { getSchools, getClasses, getSubjects } from "../../store/actions/homeUnauthActions";
import { getUserdata, getProfile, getUserTestdata } from "../../store/actions/profileActions";


const Signin = props => {
    const [email, setEmail ] = useState('');
    const [password, setPassword ] = useState('');
    const [token, setToken] = useState(localStorage.getItem('TOKEN'));

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const signinHandler = () => {
        if (!validator("email", email)) {
            alert("Please enter a valid email address");
        }
        if (validator("email", email)) {
            dispatch(postSignin(email, password));
            setTimeout(() => {
                // dispatch(getSchools());
                // dispatch(getSubjects());
                // dispatch(getClasses());
                dispatch(getTest());
                if(localStorage.getItem('TOKEN')){
                    dispatch(getProfile(localStorage.getItem('TOKEN')));
                    dispatch(getUserdata(localStorage.getItem('TOKEN')));
                    dispatch(getUserTestdata(localStorage.getItem('TOKEN')));
                }
            }, 500);
            setTimeout(() => {
                navigate('/');
            }, 1000);
            
        }
        console.log(email);
        console.log(password);
    }

    return (
        <div>
            <HeaderStatic />
            <div className={classes.container}>
                <p>SignIn</p>
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
                        label="Password: "
                        placeholder="Enter your Password"
                        type="password"
                        makeChange={(value) => {setPassword(value)}}
                    />
                </div>
                <div className={classes.button}>
                    <SubmitButton 
                        title="SignIn" 
                        makeAction={() => signinHandler()}
                    />
                </div>
                <Link className={classes.link} to='/signup'>Signup here...</Link>
            </div>
            <div className={classes.footer}>
                <Footer />
            </div>
        </div>
    );
}

export default Signin;