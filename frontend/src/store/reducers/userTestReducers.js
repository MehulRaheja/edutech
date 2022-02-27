import { START_TEST_REQUEST, START_TEST_SUCCESS, START_TEST_FAIL } from "../constants/userTestConstants";

function fetchStartTestReducer(state = { data: {} }, action) {
    switch (action.type) {
        case START_TEST_REQUEST:
            return { loading: true, data: {} };
        case START_TEST_SUCCESS:
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
        case START_TEST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export {
    fetchStartTestReducer
};