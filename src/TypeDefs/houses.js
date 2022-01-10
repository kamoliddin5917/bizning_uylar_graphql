const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Query {
    getHouses: [House!]!
  }
  type House {
    id: ID!
    floor: Int!
    room: Int!
    kvm: Int!
    kvmSum: Int!
    totalSum: String!
    media: [String!]!
    inform: String!
    date: String!
    banks: [Bank]
  }
  extend type Mutation {
    createHouse(
      complexId: ID!
      floor: Int!
      room: Int!
      kvm: Int!
      kvmSum: Int!
      media: [Upload!]!
      inform: String!
    ): ResultHouse!
    updateHouse(
      id: ID!
      floor: Int
      room: Int
      kvm: Int
      kvmSum: Int
      media: [Upload]
      inform: String
    ): ResultHouse!
    deleteHouse(id: ID!): ResultHouse!
  }
  type ResultHouse {
    status: Int!
    message: String!
    house: House!
  }
  extend type Subscription {
    houseCreated: House
    houseUpdated: House
    houseDeleted: House
  }
`;
