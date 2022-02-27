import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import dropdown from '../../assets/images/dropdown.jpg'
import logo from '../../assets/images/brandLogo.jpg';
import './Header.css';

const HeaderStatic = () => {
    const navigate = useNavigate();
    return (
        <header>
            <div className="container">
                <div className="row topbar" >
                    <img src={logo} alt='Logo' className="logo" onClick={() => navigate('/')}/>
                    <div className="col-6 left" onClick={() => navigate('/')}>
                        
                        <div className="text-welcome">
                            <h3>Welcome to</h3>
                        </div>
                        <div className="text-block">
                            <div className="text-brand">
                                <h4>SAMPANA</h4>
                            </div>
                            <div className="text-series">
                                <h4>Online Test Series</h4>
                            </div>
                        </div>
                    </div>
                    {/* <div className="col-6 right" >
                    </div> */}
                </div>
            </div>
        </header>
    );
}

const DashHeader = (props) => {
    const navigate = useNavigate();
    
    return (
        <header>
            <div className="container">
                <div className="row topbar">
                    <img src={logo} alt='Logo' className="logo" onClick={() => navigate('/')}/>
                    <div className="col-6 left"  onClick={() => navigate('/')}>
                        
                        <div className="text-welcome">
                            <h3>Welcome to</h3>
                        </div>
                        <div className="text-block">
                            <div className="text-brand">
                                <h4>SAMPANA</h4>
                            </div>
                            <div className="text-series">
                                <h4>Online Test Series</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 right" >
                        <div className="block-package">
                            <h6>Buy Package</h6>
                        </div>
                        <div className="block-student" onClick={() => props.makeAction()}>
                            <h6>{props.name ? `Hi ${props.name.split(' ')[0]}` : 'Student Login'}</h6>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
    

const Header = (props) => {
    const [schools, setSchools] = useState([]);
    const [classes, setClasses] = useState([]);
    const [subjects, setSubjects] = useState([]);

    const navigate = useNavigate();

    // console.log(schools, classes, subjects);
    useEffect(() => {
        setSchools(props.schools);
        setClasses(props.classes);
        setSubjects(props.subjects);
    })

    const navigateSigninHandler = () => {
        navigate('/signin/');
    }

    let HeaderFull = 
    <header>
        <div className="container">
            <div className="row topbar">
            <img src={logo} alt='Logo' className="logo" onClick={() => navigate('/')}/>
                <div className="col-6 left" onClick={() => navigate('/')}>
                    
                    <div className="text-welcome">
                        <h3>Welcome to</h3>
                    </div>
                    <div className="text-block">
                        <div className="text-brand">
                            <h4>SAMPANA</h4>
                        </div>
                        <div className="text-series">
                            <h4>Online Test Series</h4>
                        </div>
                    </div>
                </div>
                <div className="col-6 right" >
                    <div className="block-package">
                        <h6>Buy Package</h6>
                    </div>
                    <div 
                        onClick={() => navigateSigninHandler()} 
                        className="block-student">
                        <h6>{props.name ? `Hi ${props.name.split(' ')[0]}` : 'Student Login'}</h6>
                    </div>
                </div>
            </div>
            
        </div>
    </header>

    return (
        <div>
            {HeaderFull}
            <nav>
                <ul className="nav-menu">
                    <li>
                        <p className="nav-item"><span>Home</span></p>
                    </li>
                    <li>
                        <p className="nav-item"><span>About Us</span></p>
                    </li>
                    <li>
                        <p className="nav-item"><span>School</span><img src={dropdown} alt="down" className="dropdown" /></p>
                        <div className="dropdown-content">
                            {schools ? schools.map((s, index) => {
                                return <p key={index} className="pee"><div className="dropdown-content-dot"></div><span className="dropdown-item">{s.school}</span></p>
                            }) : null}
                        </div>

                    </li>
                    <li>
                        <p className="nav-item"><span>Class</span><img src={dropdown} alt="down" className="dropdown" /></p>
                        <div className="dropdown-content">
                            {classes ? classes.map((c, index) => {
                                return <p key={index} className="pee"><div className="dropdown-content-dot"></div><span className="dropdown-item">{c.std}</span></p>
                            }) : null}
                        </div>
                    </li>
                    <li>
                        <p className="nav-item"><span>Subject</span><img src={dropdown} alt="down" className="dropdown" /></p>
                        <div className="dropdown-content">
                            {subjects ? subjects.map((s, index) => {
                                return <p key={index} className="pee"><div className="dropdown-content-dot"></div><span className="dropdown-item">{s.subject}</span></p>
                            }) : null}
                        </div>
                    </li>
                    <li><p className="nav-item"><span>Contact Us</span></p></li>
                </ul>
            </nav>
        </div>
    );
}

export default Header;
export { HeaderStatic, DashHeader };