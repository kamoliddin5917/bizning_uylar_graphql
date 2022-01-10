const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Query {
    getComplexes: [Complex!]!
  }
  type Complex {
    id: ID!
    name: String!
    media: [String!]!
    inform: String!
    date: String!
    houses: [House]
  }
  extend type Mutation {
    createComplex(
      companyId: ID!
      name: String!
      media: [Upload!]!
      inform: String!
    ): ResultComplex!
    updateComplex(
      id: ID!
      name: String
      media: [Upload]
      inform: String
    ): ResultComplex!
    deleteComplex(id: ID!): ResultComplex!
  }
  type ResultComplex {
    status: Int!
    message: String!
    complex: Complex!
  }
  extend type Subscription {
    complexCreated: Complex
    complexUpdated: Complex
    complexDeleted: Complex
  }
`;
