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

  input UserCreateInput {
    firstname: String!
    lastname: String!
    email: Email!
    password: Password!
  }

  input UserUpdateInput {
    firstname: String
    lastname: String
    image: Upload
  }

  input UserLoginInput {
    admin: Admin!
    email: Email
    password: Password!
    username: String
    login: String
  }

  extend type Mutation {
    createUser(newUser: UserCreateInput!): ResultUnion!
    updateUser(updateUser: UserUpdateInput!): ResultUnion!
    deleteUser: ResultUnion!
    login(loginUser: UserLoginInput!): ResultUnion!
  }

  extend type Subscription {
    uuserCreated: User
    uuserUpdated: User
    uuserDeleted: User
  }
`;
