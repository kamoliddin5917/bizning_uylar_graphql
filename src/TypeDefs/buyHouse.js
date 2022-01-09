const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Mutation {
    buy(
      houseId: ID!
      bankId: ID!
      firstname: String!
      lastname: String!
      tell: String!
      email: Email!
    ): String
  }
`;
