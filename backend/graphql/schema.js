const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Test {
        testId: String!
        subject: String!
        answers: [String]
        marks: Int
        _id: String!
    }

    type User {
        _id: ID
        email: String!
        password: String
        type: String!
        name: String!
        school: String!
        std: String!
        imageUrl: String!
        tests: [Test]
    }

    type AuthData {
        token: String!
        userId: String!
        userName: String!
    }

    type TestResult {
        message: String!
        marks: Int!
    }

    type UserSaved {
        message: String!
        name: String!
        email: String!
        userId: String!
        imageUrl: String!
    }

    input SubmitTestData {
        testId: String!
        subject: String!
        answers: [String]!
    }

    input UserInputData {
        email: String!
        password: String!
        type: String!
        name: String!
        school: String!
        std: String!
        imageUrl: String!
    }

    type RootQuery {
        getUser: User!
        login(email: String!, password: String!): AuthData!
    }

    type RootMutation {
        signup(userInput: UserInputData): UserSaved!
        update(userInput: UserInputData): UserSaved!
        submitTest(testSubmit: SubmitTestData): TestResult!
    }
        
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);

// query is used to read data and mutation are used to write, edit and delete data
// RootQuery and RootMutation contains the name of the functions which are defined in the resolver file
// keywords written after : are types that will be returned and ! specifies that type should be returned otherwise it will give an error
// if the return type is custom defined type like PostData(above given) data returned should be an object with keys that are specified in the custom defined type and return type of the keys will be their respective type
// resolver will return the data that is specified in any RootQuery or RootMutation after ':'
// fields inside () after query name are the data that will come from frontend and its schema would be 'input' not 'type'
// ID is special type by graphql, it is unique which means it can be used for ids
// 

