import { fetchSchools, fetchClasses, fetchSubjects } from "../../utils/api";
import { 
    GET_SCHOOLS_REQUEST, 
    GET_SCHOOLS_SUCCESS,
    GET_SCHOOLS_FAIL,
    GET_SUBJECTS_REQUEST,
    GET_SUBJECTS_SUCCESS,
    GET_SUBJECTS_FAIL,
    GET_CLASSES_REQUEST,
    GET_CLASSES_SUCCESS,
    GET_CLASSES_FAIL, 
} from "../constants/homeUnauthConstants";

const getSchools = () => async(dispatch) => {
    try {
        dispatch({ type: GET_SCHOOLS_REQUEST });
        const schools = await fetchSchools();
        if(schools.status === 200){
            // console.log(schools.data);
            dispatch({ type: GET_SCHOOLS_SUCCESS, payload: schools.data });
        }
    } catch (error) {
        console.log(error);
        dispatch({ type: GET_SCHOOLS_FAIL, payload: error.message });
    }
}

const getClasses = () => async(dispatch) => {
    try {
        dispatch({ type: GET_CLASSES_REQUEST });
        const stds = await fetchClasses();
        if(stds.status === 200){
            // console.log(schools.data);
            dispatch({ type: GET_CLASSES_SUCCESS, payload: stds.data });
        }
    } catch (error) {
        console.log(error);
        dispatch({ type: GET_CLASSES_FAIL, payload: error.message });
    }
}

const getSubjects = () => async(dispatch) => {
    try {
        dispatch({ type: GET_SUBJECTS_REQUEST });
        const subjects = await fetchSubjects();
        if(subjects.status === 200){
            // console.log(schools.data);
            dispatch({ type: GET_SUBJECTS_SUCCESS, payload: subjects.data });
        }
    } catch (error) {
        console.log(error);
        dispatch({ type: GET_SUBJECTS_FAIL, payload: error.message });
    }
}

export {getSchools, getClasses, getSubjects};