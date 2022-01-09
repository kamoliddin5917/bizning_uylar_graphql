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
    ): ResultBank!
    updateBank(
      id: ID!
      name: String
      email: Email
      kriditSum: Int
      kriditTime: Int
      media: [Upload]
      inform: String
    ): ResultBank!
    deleteBank(id: ID!): ResultBank!
  }
  type ResultBank {
    status: Int!
    message: String!
    bank: Bank!
  }
`;
