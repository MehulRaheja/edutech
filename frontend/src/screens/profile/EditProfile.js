import React from "react";
import { Link } from "react-router-dom";

import { DashHeader } from '../../component/Header/Header';
import Footer from '../../component/Footer/Footer';
import classes from './EditProfile.module.css';
import TopElement from "../../component/ProfileComponents/TopElement";
import AddField from "../../component/ProfileComponents/AddField";

const EditProfile = props => {

    return (
        <div className={classes.main_container}>
            <div className={classes.header}>
                <DashHeader />
            </div>
            <div className={classes.container}>
                <div className={classes.top_container}>
                    <div className={classes.elements}>
                        <Link className={classes.link} to='/profile/'>
                            <TopElement title="Profile" />
                        </Link>
                        <Link className={classes.link} to='/edit-profile/'>
                            <TopElement title="Edit Profile" status="active" />
                        </Link>
                        <Link className={classes.link} to='/reset-password/'>
                            <TopElement title="Reset Password"/>
                        </Link>
                    </div>
                    <div className={classes.bot_border}></div>
                </div>
                <div className={classes.bottom_container}>
                    <div><h1>For image</h1></div>
                    <div className={classes.field_container}>
                       <AddField title="Name" order="odd"/>
                       <AddField title="Class" order="even"/>
                       <AddField title="School" order="odd"/>
                       <AddField title="Role" order="even"/>
                       <AddField title="E-mail" order="odd"/>
                       <AddField title="Status" order="even"/>
                    </div>
                </div>
            </div>
            <div className={classes.footer}>
                <Footer />
            </div>
            
        </div>
    );
}

export default EditProfile;