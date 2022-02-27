import React, { useState, useEffect, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { DashHeader } from '../../component/Header/Header';
import Footer from '../../component/Footer/Footer';
import classes from './Profile.module.css';
import TopElement from "../../component/ProfileComponents/TopElement";
import FieldElement from "../../component/ProfileComponents/FieldElement";
import { getProfile } from "../../store/actions/profileActions";
import Image from '../../component/UI/Image/Image';

const Profile = props => {
    const [profile, setProfile] = useState({});
    const [imageUrl, setImageUrl] = useState('');
    const [token, setToken] = useState(localStorage.getItem('TOKEN'));

    const profileData = useSelector((state) => state.getProfile);

    const dispatch = useDispatch();

    useLayoutEffect(() => {
        console.log(profileData);
        if(token){
            dispatch(getProfile(token));
            // dispatch(getUserdata(token));
            // dispatch(getUserTestdata(token));
        }
    },[]);

    useLayoutEffect(() => {
        if(profileData.loading === false){
            setProfile(profileData.data);
            console.log(profileData.data);
            setImageUrl(`${process.env.REACT_APP_BASE_URL}/${profileData.data.imageUrl}`);
            console.log(`${process.env.REACT_APP_BASE_URL}/${profileData.data.imageUrl}`);
            console.log(profile);
        }
        
    },[profileData, profile]);

    return (
        <div className={classes.main_container}>
            <div className={classes.header}>
                <DashHeader />
            </div>
            <div className={classes.container}>
                <div className={classes.top_container}>
                    <div className={classes.elements}>
                        <Link className={classes.link} to='/profile/'>
                            <TopElement title="Profile" status="active"/>
                        </Link>
                        <Link className={classes.link} to='/edit-profile/'>
                            <TopElement title="Edit Profile"/>
                        </Link>
                        <Link className={classes.link} to='/reset-password/'>
                            <TopElement title="Reset Password"/>
                        </Link>
                    </div>
                    <div className={classes.bot_border}></div>
                </div>
                <div className={classes.bottom_container}>
                    <div className={classes.imgcontainer}>
                        {/* <Image contain imageUrl={imageUrl}/> */}
                        <img src={imageUrl} alt="user_profile" className={classes.img}/>
                    </div>
                    <div className={classes.field_container}>
                        <FieldElement title="Name" val={profile.name} order="odd" />
                        <FieldElement title="Class" val={profile.std} order="even" />
                        <FieldElement title="School" val={profile.school} order="odd" />
                        <FieldElement title="Role" val="Student" order="even" />
                        <FieldElement title="E-mail" val={profile.email} order="odd" />
                        <FieldElement title="Status" val="Active" order="even" />
                    </div>
                </div>
            </div>
            <div className={classes.footer}>
                <Footer />
            </div>
            
        </div>
    );
}

export default Profile;