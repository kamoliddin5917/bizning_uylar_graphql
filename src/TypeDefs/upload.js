const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Mutation {
    singleUpload(file: Upload!): SuccessMessage
    multipleUpload(file: [Upload!]!): SuccessMessage
  }
  type SuccessMessage {
    message: String
  }
`;
