const upload = require("../upload");
const users = require("../users");
const companies = require("../companies");
const complexes = require("../complexes");
const houses = require("../houses");
const banks = require("../banks");
const buyHouse = require("../buyHouse");

// Scalar
const scalarUpload = require("../scalar/Upload");
const scalarPassword = require("../scalar/Password");
const scalarEmail = require("../scalar/Email");

// Enum
const enumAdmin = require("../enum/Admin");

module.exports = [
  scalarUpload,
  scalarPassword,
  scalarEmail,
  enumAdmin,
  upload,
  users,
  companies,
  complexes,
  houses,
  banks,
  buyHouse,
];
