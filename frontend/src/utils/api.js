import Axios from 'axios';

export const signinRequest = async (email, password) => {
   
    try {
        const graphqlQuery = {
            query: `
                query UserSignin($email: String!, $password: String!) {
                    login(email: $email, password: $password) {
                        token
                    }
                }
            `,
            variables: {
                email: email,
                password: password
            }
        };
        const result = await Axios.post(
            `${process.env.REACT_APP_BASE_URL}/graphql/`, graphqlQuery
        );
        return result.data.data.login;
    } catch (error) {
        console.log("API ERROR: "+error);
        return error;
    }
}

export const signupRequest = async (data) => {
    const formData = new FormData();
    formData.append('image', data[6]);
    
    
    
    try {
        const fileData = await Axios.put(
            `${process.env.REACT_APP_BASE_URL}/post-image`, formData
        )
        console.log(typeof fileData.data.filePath);
        
        if(fileData.status === 201 && fileData.data.filePath) {
            // console.log(fileData.data.filePath);
            const graphqlQuery = {
                query: `
                    mutation UserSignup($email: String!, $password: String!, $type: String!, $name: String!, $school: String!, $std: String!, $imageUrl: String!) {
                        signup(userInput: {email: $email, password: $password, type: $type, name: $name, school: $school, std: $std, imageUrl: $imageUrl}) {
                            message
                            name
                            email
                            imageUrl
                        }
                    }
                `,
                variables: {
                    email: data[0],
                    password: data[1],
                    type: data[2],
                    name: data[3],
                    school: data[4],
                    std: data[5],
                    imageUrl: fileData.data.filePath
                }
            };
            const apiData = await Axios.post(
                `${process.env.REACT_APP_BASE_URL}/graphql/`, graphqlQuery
            );
            console.log(apiData);
            return apiData;
        }
        
    } catch (error) {
        console.log("API ERROR: "+error);
        return error;
    }
    
}

export const fetchProfile = async (token) => {
    try {
        const graphqlQuery = {
            query: `
                {
                    getUser {
                        name
                        email
                        school
                        std
                        imageUrl
                    }
                }
            `
        };
        const result = await Axios.post(
            `${process.env.REACT_APP_BASE_URL}/graphql/`, graphqlQuery,
            { headers: {"Authorization" : `Bearer ${token}` } }
        );
        console.log(result.data.data);
        return result.data.data.getUser;
    } catch (error) {
        console.log("API ERROR: "+error);
        return error;
    }
  
}

export const fetchUserdata = async (token) => {
    try {
        const data = await Axios.get(
            `${process.env.REACT_APP_BASE_URL}/userdata`, 
            { headers: {"Authorization" : `Bearer ${token}`}});
            return data;
    } catch (error) {
        console.log("API ERROR: "+error);
        return error;
    }
}

export const fetchUserTestdata = async (token) => {
    try {
        const graphqlQuery = {
            query: `
                {
                    getUser {
                        name
                        std
                        school
                        tests {
                            testId
                            subject
                            answers
                            marks
                            _id
                        }
                    }
                }
            `
        };
        const result = await Axios.post(
            `${process.env.REACT_APP_BASE_URL}/graphql/`, graphqlQuery,
            { headers: {"Authorization" : `Bearer ${token}` } }
        );
        // console.log(result.data);
        return result;
    } catch (error) {
        console.log("API ERROR: "+error);
        return error;
    }
    
}

export const fetchTestData = async () => {
    try {
        const data = await Axios.get(process.env.REACT_APP_BASE_URL);
        return data;
    } catch (error) {
        console.log("API ERROR: "+error);
        return error;
    }
}

export const fetchStartTestData = async (testId, token) => {
    try {
        const data = await Axios.get(
            `${process.env.REACT_APP_BASE_URL}/post/${testId}`,
            { headers: {"Authorization" : `Bearer ${token}`}});
        return data;
    } catch (error) {
        console.log("API ERROR: "+error);
        return error;
    }
}

export const fetchFreeTestData = async (std, subject) => {
    const body = {
        std: std, 
        subject: subject
    };
    try {
        const data = await Axios.post(`${process.env.REACT_APP_BASE_URL}/freetest`, body);
        return data;
    } catch (error) {
        console.log("API ERROR: "+error);
        return error;
    }
}

export const fetchSchools = async () => {
    try {
        const data = await Axios.get(`${process.env.REACT_APP_BASE_URL}/school`);
        return data;
    } catch (error) {
        console.log("API ERROR: "+error);
        return error;
    }
}


export const fetchClasses = async () => {
    try {
        const data = await Axios.get(`${process.env.REACT_APP_BASE_URL}/standard`);
        return data;
    } catch (error) {
        console.log("API ERROR: "+error);
        return error;
    }
}

export const fetchSubjects = async () => {
    try {
        const data = await Axios.get(`${process.env.REACT_APP_BASE_URL}/subject`);
        return data;
    } catch (error) {
        console.log("API ERROR: "+error);
        return error;
    }
}

export const submitUserTest = async (testId, subject, responseArray, token) => {
    // const body = {
    //     testId : testId,
    //     subject: subject,
    //     answers: responseArray
    // };
    const graphqlQuery = {
        query: `
            mutation UserTestSubmit($testId: String!, $subject: String!, $answers: [String]! ) {
                submitTest(testSubmit: {testId: $testId, subject: $subject, answers: $answers}) {
                    message
                    marks
                }
            }
        `,
        variables: {
            testId: testId,
            subject: subject,
            answers: responseArray
        }
    };
    try {
        const result = await Axios.post(
            `${process.env.REACT_APP_BASE_URL}/graphql/`, graphqlQuery,
            { headers: {"Authorization" : `Bearer ${token}` } }
        );
        console.log(result.data);
        return result;
    } catch (error) {
        console.log("API ERROR: "+error);
        return error;
    }
   
}
