import { fetchProfile, fetchUserdata, fetchUserTestdata } from "../../utils/api";
import { 
    GET_PROFILE_FAIL, 
    GET_PROFILE_REQUEST, 
    GET_PROFILE_SUCCESS, 
    GET_USERDATA_FAIL, 
    GET_USERDATA_REQUEST,
    GET_USERDATA_SUCCESS,
    GET_USER_TESTDATA_REQUEST,
    GET_USER_TESTDATA_SUCCESS,
    GET_USER_TESTDATA_FAIL 
} from "../constants/profileConstants";

const getProfile = (token) => async(dispatch) => {
    try {
        dispatch({ type: GET_PROFILE_REQUEST });
        const profileData = await fetchProfile(token);
        if(profileData){
            dispatch({ type: GET_PROFILE_SUCCESS, payload: profileData });
        } else {
            // localStorage.removeItem('TOKEN');
        }
    } catch (error) {
        console.log(error);
        dispatch({ type: GET_PROFILE_FAIL, payload: error.message });
    }

};

const getUserdata = (token) => async(dispatch) => {
    try {
        dispatch({ type: GET_USERDATA_REQUEST });
        const userData = await fetchUserdata(token);
        if(userData.status === 200){
            dispatch({ type: GET_USERDATA_SUCCESS, payload: userData.data });
            console.log(userData);
        } else {
            // localStorage.removeItem('TOKEN');
        }
    } catch (error) {
        console.log(error);
        dispatch({ type: GET_USERDATA_FAIL, payload: error.message });
    }

};

const getUserTestdata = (token) => async(dispatch) => {
    try {
        dispatch({ type: GET_USER_TESTDATA_REQUEST });
        const userTestData = await fetchUserTestdata(token);
        if(userTestData){
            console.log(userTestData.data);
            dispatch({ type: GET_USER_TESTDATA_SUCCESS, payload: userTestData.data });
        } else {
            // localStorage.removeItem('TOKEN');
        }
    } catch (error) {
        console.log(error);
        dispatch({ type: GET_USER_TESTDATA_FAIL, payload: error.message });
    }

};

export { getProfile, getUserdata, getUserTestdata };