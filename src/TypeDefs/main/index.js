const { gql } = require("apollo-server-express");

const upload = require("../upload");
const users = require("../users");
const companies = require("../companies");
const complexes = require("../complexes");
const houses = require("../houses");
const banks = require("../banks");
const buyHouse = require("../buyHouse");

const typeDefs = gql`
  scalar Upload
  scalar Password
  scalar Email

  enum Admin {
    SUPER
    USER
  }

  type Query {
    _: String
  }

  type Mutation {
    _: String
  }
`;

module.exports = [
  typeDefs,
  upload,
  users,
  companies,
  complexes,
  houses,
  banks,
  buyHouse,
];
