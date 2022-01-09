const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Query {
    getUsers: [User!]!
  }
  type User {
    id: ID!
    firstname: String!
    lastname: String!
    email: Email!
    image: String
    date: String!
    companies: [Company]
  }
  extend type Mutation {
    createUser(
      firstname: String!
      lastname: String!
      email: Email!
      password: Password!
    ): Result!
    updateUser(firstname: String, lastname: String, image: Upload): Result!
    deleteUser: Result!
    login(
      admin: Admin!
      email: Email
      password: Password!
      username: String
      login: String
    ): Result!
  }

  type Result {
    status: Int!
    message: String!
    data: UserResult!
  }

  type UserResult {
    token: String
    user: User!
  }
`;
