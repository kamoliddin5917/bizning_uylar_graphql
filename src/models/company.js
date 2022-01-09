const { pgFetchAll, pgFetch } = require("../utils/postgres");

// GET
const FIND_COMPANIES = "SELECT * FROM companies";
const FIND_COMPANY_COMPLEXES =
  "SELECT * FROM complexes WHERE complex_company = $1";
// POST
const CREATE_COMPANY =
  "INSERT INTO companies(company_name, company_media, company_inform, company_owner) VALUES ($1, $2, $3, $4) RETURNING *";
// PUT
const FIND_COMPANY_UPDATE = "SELECT * FROM companies WHERE company_id = $1";
const UPDATE_COMPANY =
  "UPDATE companies SET company_name = $1, company_inform = $2 WHERE company_id = $3 RETURNING *";
const UPDATE_COMPANY_MEDIA =
  "UPDATE companies SET company_name = $1, company_inform = $2, company_media = $3 WHERE company_id = $4 RETURNING *";
// DELETE
const DELETE_COMPANY =
  "DELETE FROM companies WHERE company_id = $1 RETURNING *";

// GET
const companies = (...values) => pgFetchAll(FIND_COMPANIES, values);
const complexes = (...values) => pgFetchAll(FIND_COMPANY_COMPLEXES, values);
// PUT
const findCompany = (...values) => pgFetch(FIND_COMPANY_UPDATE, values);
const updateCompanyMedia = (...values) => pgFetch(UPDATE_COMPANY_MEDIA, values);
const updateCompany = (...values) => pgFetch(UPDATE_COMPANY, values);
// POST
const createCompany = (...values) => pgFetch(CREATE_COMPANY, values);
// DELETE
const deleteCompany = (...values) => pgFetch(DELETE_COMPANY, values);

module.exports = {
  companies,
  complexes,
  createCompany,
  deleteCompany,
  findCompany,
  updateCompanyMedia,
  updateCompany,
};
