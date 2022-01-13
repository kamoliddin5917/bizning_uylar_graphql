const { gql } = require("apollo-server-express");

module.exports = gql`
  union ResultUnion =
      Result
    | ResultCompany
    | ResultComplex
    | ResultHouse
    | ResultBank
    | Error

  type Result {
    status: Int!
    message: String!
    data: UserResult!
  }

  type UserResult {
    token: String
    user: User!
  }

  type ResultCompany {
    status: Int!
    message: String!
    company: Company!
  }

  type ResultComplex {
    status: Int!
    message: String!
    complex: Complex!
  }

  type ResultHouse {
    status: Int!
    message: String!
    house: House!
  }

  type ResultBank {
    status: Int!
    message: String!
    bank: Bank!
  }
`;
