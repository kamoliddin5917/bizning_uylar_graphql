const { pgFetchAll, pgFetch } = require("../utils/postgres");

// GET
const FIND_COMPLEXES = "SELECT * FROM complexes";
const FIND_COMPLEX_HOUSES = "SELECT * FROM houses WHERE house_complex = $1";
// POST
const CREATE_COMPLEX =
  "INSERT INTO complexes(complex_name, complex_media, complex_inform, complex_company) VALUES ($1, $2, $3, $4) RETURNING *";
// PUT
const FIND_COMPLEX_UPDATE = "SELECT * FROM complexes WHERE complex_id = $1";
const UPDATE_COMPLEX_MEDIA =
  "UPDATE complexes SET complex_name = $1, complex_inform = $2, complex_media = $3 WHERE complex_id = $4 RETURNING *";
const UPDATE_COMPLEX =
  "UPDATE complexes SET complex_name = $1, complex_inform = $2 WHERE complex_id = $3 RETURNING *";
// DELETE
const DELETE_COMPLEX =
  "DELETE FROM complexes WHERE complex_id = $1 RETURNING *";

// GET
const complexes = (...values) => pgFetchAll(FIND_COMPLEXES, values);
const houses = (...values) => pgFetchAll(FIND_COMPLEX_HOUSES, values);
// POST
const createComplex = (...values) => pgFetch(CREATE_COMPLEX, values);
// PUT
const findComplex = (...values) => pgFetch(FIND_COMPLEX_UPDATE, values);
const updateComplexMedia = (...values) => pgFetch(UPDATE_COMPLEX_MEDIA, values);
const updateComplex = (...values) => pgFetch(UPDATE_COMPLEX, values);
// DELETE
const deleteComplex = (...values) => pgFetch(DELETE_COMPLEX, values);

module.exports = {
  complexes,
  houses,
  createComplex,
  findComplex,
  updateComplexMedia,
  updateComplex,
  deleteComplex,
};
