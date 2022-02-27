import { signinRequest, signupRequest } from "../../utils/api";



const postSignin = (email, password) => async(dispatch) => {
    try {
        // dispatch({ type: POST_SIGNIN_REQUEST });
        const userData = await signinRequest(email, password);
        localStorage.setItem('TOKEN', userData.token);
        // console.log(userData);
        // console.log(localStorage.getItem('TOKEN'));
    } catch (error) {
        console.log(error);
        // dispatch({ type: POST_SIGNIN_FAIL, payload: error.message });
    }

};

const postSignup = (data) => async(dispatch) => {
    try {
        // dispatch({ type: POST_SIGNUP_REQUEST });
        const userData = await signupRequest(data);
        console.log(userData.data);
        alert('Account created Successfully.');
    } catch (error) {
        console.log(error);
        // dispatch({ type: POST_SIGNUP_FAIL, payload: error.message });
    }

};

export { postSignin, postSignup };