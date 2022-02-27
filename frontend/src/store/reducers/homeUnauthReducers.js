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

function schoolsNameReducer(state = { data: {} }, action) {
    switch (action.type) {
        case GET_SCHOOLS_REQUEST:
            return { loading: true, data: {} };
        case GET_SCHOOLS_SUCCESS:
            // console.log(action.payload.tests);
            return { loading: false, data: {schools: action.payload.schools} };
        case GET_SCHOOLS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

function classesNameReducer(state = { data: {} }, action) {
    switch (action.type) {
        case GET_CLASSES_REQUEST:
            return { loading: true, data: {} };
        case GET_CLASSES_SUCCESS:
            // console.log(action.payload.stds);
            return { loading: false, data: {stds: action.payload.stds} };
        case GET_CLASSES_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

function subjectsNameReducer(state = { data: {} }, action) {
    switch (action.type) {
        case GET_SUBJECTS_REQUEST:
            return { loading: true, data: {} };
        case GET_SUBJECTS_SUCCESS:
            // console.log(action.payload.subjects);
            return { loading: false, data: {subjects: action.payload.subjects} };
        case GET_SUBJECTS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export {
    schoolsNameReducer,
    classesNameReducer,
    subjectsNameReducer
};