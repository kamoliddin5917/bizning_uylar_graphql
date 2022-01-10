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
    ): ResultCompany!
    updateCompany(
      id: ID!
      name: String
      media: [Upload]
      inform: String
    ): ResultCompany!
    deleteCompany(id: ID!): ResultCompany!
  }
  type ResultCompany {
    status: Int!
    message: String!
    company: Company!
  }
  extend type Subscription {
    companyCreated: Company
    companyUpdated: Company
    companyDeleted: Company
  }
`;
