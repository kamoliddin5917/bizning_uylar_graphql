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

// Union
const unionResult = require("../union/Result");

module.exports = [
  scalarUpload,
  scalarPassword,
  scalarEmail,
  enumAdmin,
  unionResult,
  upload,
  users,
  companies,
  complexes,
  houses,
  banks,
  buyHouse,
];
