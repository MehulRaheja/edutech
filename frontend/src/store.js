import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { fetchFreeTestReducer, fetchTestReducer } from './store/reducers/freeTestReducers';
import { classesNameReducer, schoolsNameReducer, subjectsNameReducer } from './store/reducers/homeUnauthReducers';
import { getProfileReducer, getUserdataReducer, getUserTestdataReducer } from './store/reducers/profileReducers';
import { fetchStartTestReducer } from './store/reducers/userTestReducers';

const reducer = combineReducers({
    fetchTest: fetchTestReducer,
    fetchFreeTest: fetchFreeTestReducer,
    schoolsName: schoolsNameReducer,
    classesName: classesNameReducer,
    subjectsName: subjectsNameReducer,
    getProfile: getProfileReducer,
    getUserdata: getUserdataReducer,
    getUserTestdata: getUserTestdataReducer,
    fetchStartTest: fetchStartTestReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;