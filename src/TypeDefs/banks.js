const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Query {
    getBanks: [Bank!]!
  }
  type Bank {
    id: ID!
    name: String!
    email: Email!
    kriditSum: String!
    kriditTime: String!
    media: [String!]!
    inform: String!
    date: String!
  }
  extend type Mutation {
    createBank(
      name: String!
      email: Email!
      kriditSum: Int!
      kriditTime: Int!
      media: [Upload!]!
      inform: String!
    ): ResultUnion!
    updateBank(
      id: ID!
      name: String
      email: Email
      kriditSum: Int
      kriditTime: Int
      media: [Upload]
      inform: String
    ): ResultUnion!
    deleteBank(id: ID!): ResultUnion!
  }

  extend type Subscription {
    bankCreated: Bank
    bankUpdated: Bank
    bankDeleted: Bank
  }
`;
