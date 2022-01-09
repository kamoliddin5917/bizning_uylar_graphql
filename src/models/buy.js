const { pgFetch } = require("../utils/postgres");

// GET
const FIND_USER = `
SELECT u.user_id, u.user_email, u.user_firstname, u.user_lastname
FROM houses h INNER JOIN
complexes c ON h.house_complex = c.complex_id
INNER JOIN
companies cp
ON c.complex_company = cp.company_id
INNER JOIN users u
ON cp.company_owner = u.user_id
WHERE h.house_id = $1`;
const FIND_BANK = "SELECT * FROM banks WHERE bank_id = $1";

// GET
const findUser = (...values) => pgFetch(FIND_USER, values);
const findBank = (...values) => pgFetch(FIND_BANK, values);

module.exports = { findUser, findBank };
