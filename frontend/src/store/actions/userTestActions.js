import { fetchStartTestData } from "../../utils/api";
import { START_TEST_REQUEST,  START_TEST_SUCCESS, START_TEST_FAIL } from "../constants/userTestConstants";


const getStartTest = (testId, token) => async(dispatch) => {
    try {
        dispatch({ type: START_TEST_REQUEST });
        const startTestData = await fetchStartTestData(testId, token);
        if (startTestData.status === 200){
            console.log(startTestData.data);
            dispatch({ type: START_TEST_SUCCESS, payload: startTestData.data });
        }
    } catch (error) {
        console.log(error.message);
        dispatch({ type: START_TEST_FAIL, payload: error.message });
    }
}

export { getStartTest };