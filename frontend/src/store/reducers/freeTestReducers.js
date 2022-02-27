import { FREE_TEST_REQUEST, FREE_TEST_SUCCESS, FREE_TEST_FAIL, TEST_REQUEST, TEST_SUCCESS, TEST_FAIL } from "../constants/freeTestConstants";


function fetchTestReducer(state = { data: {} }, action) {
    switch (action.type) {
        case TEST_REQUEST:
            return { loading: true, data: {} };
        case TEST_SUCCESS:
            // console.log(action.payload.tests);
            return { loading: false, data: {tests: action.payload.tests} };
        case TEST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}
// below methods will provide arrays from objects
// const something = Object.keys(objectName);   array of object keys
// const something = Object.values(objectName);   array of object values
// const something = Object.entries(objectName);   array of arrays of the object key and values

function fetchFreeTestReducer(state = { data: {} }, action) {
    switch (action.type) {
        case FREE_TEST_REQUEST:
            return { loading: true, data: {} };
        case FREE_TEST_SUCCESS:
            let questionArray = [];
            const questions = action.payload.test.questions;
            questionArray.push(questions.que1);
            questionArray.push(questions.que2);
            questionArray.push(questions.que3);
            questionArray.push(questions.que4);
            questionArray.push(questions.que5);
            questionArray.push(questions.que6);
            questionArray.push(questions.que7);
            questionArray.push(questions.que8);
            questionArray.push(questions.que9);
            questionArray.push(questions.que10);
            const dataObject = {
                testId: action.payload.test._id,
                std: action.payload.test.class,
                difficulty: action.payload.test.difficulty,
                subject: action.payload.test.subject,
                title: action.payload.test.title,
                topic: action.payload.test.topic,
                questions: questionArray,
            }
            // console.log(action.payload.test);
            return { 
                data: dataObject,
                loading: false
            };
        case FREE_TEST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export {
    fetchTestReducer,
    fetchFreeTestReducer,
};