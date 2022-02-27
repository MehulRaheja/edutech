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

