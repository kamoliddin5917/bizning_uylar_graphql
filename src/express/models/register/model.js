const { pgFetch } = require("../../../utils/postgres");

// GET
const FIND_USER =
  "SELECT * FROM verify_users WHERE id = $1 AND is_active = 'false'";
// POST
const CREATE_USER =
  "INSERT INTO verify_users(firstname, lastname, email, password, cod) VALUES ($1, $2, $3, $4, $5) RETURNING *";
const INSERT_USER =
  "INSERT INTO users(user_firstname, user_lastname, user_email, user_password) VALUES ($1,$2,$3,$4) RETURNING *";
// PUT
const UPDATE_USER =
  "UPDATE verify_users SET is_active = 'true' WHERE id = $1 RETURNING *";
const UPDATE_USER_TRY =
  "UPDATE verify_users SET try_count = $1 WHERE id = $2 RETURNING *";
// DELETE
const DELETE_USER =
  "DELETE FROM verify_users WHERE id = $1 AND is_active = 'false' RETURNING *";

// GET
const findUser = (...values) => pgFetch(FIND_USER, values);
// POST
const createUser = (...values) => pgFetch(CREATE_USER, values);
const insertUser = (...values) => pgFetch(INSERT_USER, values);
// PUT
const updateUser = (...values) => pgFetch(UPDATE_USER, values);
const updateUserTry = (...values) => pgFetch(UPDATE_USER_TRY, values);
// DELETE
const deletedUser = (...values) => pgFetch(DELETE_USER, values);

module.exports = {
  findUser,
  createUser,
  updateUser,
  deletedUser,
  updateUserTry,
  insertUser,
};
