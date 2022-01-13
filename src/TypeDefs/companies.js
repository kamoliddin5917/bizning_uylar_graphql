const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Query {
    getCompanies: [Company!]!
  }
  type Company {
    id: ID!
    name: String!
    media: [String!]!
    inform: String!
    date: String!
    complexes: [Complex]
  }

  extend type Mutation {
    createCompany(
      name: String!
      media: [Upload!]!
      inform: String!
    ): ResultUnion!

    updateCompany(
      id: ID!
      name: String
      media: [Upload]
      inform: String
    ): ResultUnion!
    deleteCompany(id: ID!): ResultUnion!
  }

  extend type Subscription {
    companyCreated: Company
    companyUpdated: Company
    companyDeleted: Company
  }
`;
