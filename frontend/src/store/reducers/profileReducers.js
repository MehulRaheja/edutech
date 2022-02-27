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

function getProfileReducer(state = { data: {} }, action) {
    switch (action.type) {
        case GET_PROFILE_REQUEST:
            return { loading: true, data: {} };
        case GET_PROFILE_SUCCESS:
            console.log(action.payload);
            return { 
                loading: false, 
                data: {
                    name: action.payload.name,
                    email: action.payload.email,
                    school: action.payload.school,
                    std: action.payload.std,
                    imageUrl: action.payload.imageUrl
                } 
            };
        case GET_PROFILE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

function getUserdataReducer(state = { data: {} }, action) {
    switch (action.type) {
        case GET_USERDATA_REQUEST:
            return { loading: true, data: {} };
        case GET_USERDATA_SUCCESS:
            // console.log(action.payload);
            return { 
                loading: false, 
                data: {
                    tests: action.payload.tests
                } 
            };
        case GET_USERDATA_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

function getUserTestdataReducer(state = { data: {} }, action) {
    switch (action.type) {
        case GET_USER_TESTDATA_REQUEST:
            return { loading: true, data: {} };
        case GET_USER_TESTDATA_SUCCESS:
            console.log(action.payload.data.getUser);
            return { 
                loading: false, 
                data: {
                    name: action.payload.data.getUser.name,
                    std: action.payload.data.getUser.std,
                    school: action.payload.data.getUser.school,
                    result: action.payload.data.getUser
                } 
            };
        case GET_USER_TESTDATA_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export { getProfileReducer, getUserdataReducer, getUserTestdataReducer };