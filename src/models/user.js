const { pgFetchAll, pgFetch } = require("../utils/postgres");

// GET
const FIND_USERS = "SELECT * FROM users";
const FIND_USER_COMPANIES = "SELECT * FROM companies WHERE company_owner = $1";
// POST
const CREATE_USER =
  "INSERT INTO users(user_firstname, user_lastname, user_email, user_password) VALUES ($1, $2, $3, $4) RETURNING *";
// PUT
const FIND_USER_UPDATE = "SELECT * FROM users WHERE user_id = $1";
const USER_UPDATE =
  "UPDATE users SET user_firstname = $1, user_lastname = $2 WHERE user_id = $3 RETURNING *";
const USER_UPDATE_IMAGE =
  "UPDATE users SET user_firstname = $1, user_lastname = $2, user_image = $3 WHERE user_id = $4 RETURNING *";
// DELETE
const USER_DELETE = "DELETE FROM users WHERE user_id = $1 RETURNING *";

// LOGIN
const FIND_USER = "SELECT * FROM users WHERE user_email = $1";
const FIND_ADMIN = "SELECT * FROM admins WHERE admin_username = $1";

// GET
const users = (...values) => pgFetchAll(FIND_USERS, values);
const companies = (...values) => pgFetchAll(FIND_USER_COMPANIES, values);
// POST
const createUser = (...values) => pgFetch(CREATE_USER, values);
// PUT
const findUser = (...values) => pgFetch(FIND_USER_UPDATE, values);
const updateUser = (...values) => pgFetch(USER_UPDATE, values);
const updateUserImage = (...values) => pgFetch(USER_UPDATE_IMAGE, values);
// DELETE
const deleteUser = (...values) => pgFetch(USER_DELETE, values);

// LOGIN
const findUserLogin = (...values) => pgFetch(FIND_USER, values);
const findAdminLogin = (...values) => pgFetch(FIND_ADMIN, values);

module.exports = {
  users,
  companies,
  createUser,
  findUser,
  updateUser,
  updateUserImage,
  deleteUser,
  findUserLogin,
  findAdminLogin,
};
