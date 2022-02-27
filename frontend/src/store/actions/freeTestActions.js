import { fetchFreeTestData, fetchTestData } from "../../utils/api";
import { FREE_TEST_REQUEST, FREE_TEST_SUCCESS, FREE_TEST_FAIL, TEST_REQUEST, TEST_SUCCESS, TEST_FAIL } from "../constants/freeTestConstants"

const getTest = () => async(dispatch) => {
    try {
        dispatch({ type: TEST_REQUEST });
        const testData = await fetchTestData();
        if(testData.status === 200){
            // console.log(freeTestData.data);
            dispatch({ type: TEST_SUCCESS, payload: testData.data });
        }
    } catch (error) {
        console.log(error);
        dispatch({ type: TEST_FAIL, payload: error.message });
    }
}

const getFreeTest = (std, subject) => async(dispatch) => {
    try {
        dispatch({ type: FREE_TEST_REQUEST });
        const freeTestData = await fetchFreeTestData(std, subject);
        if (freeTestData.status === 200){
            // console.log(freeTestData.data);
            dispatch({ type: FREE_TEST_SUCCESS, payload: freeTestData.data });
        }
    } catch (error) {
        console.log(error.message);
        dispatch({ type: FREE_TEST_FAIL, payload: error.message });
    }
}

export {getFreeTest, getTest};