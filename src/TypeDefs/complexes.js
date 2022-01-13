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
    ): ResultUnion!
    updateComplex(
      id: ID!
      name: String
      media: [Upload]
      inform: String
    ): ResultUnion!
    deleteComplex(id: ID!): ResultUnion!
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
