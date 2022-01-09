const { pgFetchAll, pgFetch } = require("../utils/postgres");

// GET
const FIND_BANKS = "SELECT * FROM banks";
// POST
const CREATE_BANK =
  "INSERT INTO banks(bank_name,bank_kridit_sum,bank_kridit_time,bank_email,bank_inform,bank_media) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *";
// PUT
const FIND_BANK_UPDATE = "SELECT * FROM banks WHERE bank_id = $1";
const UPDATE_BANK_MEDIA =
  "UPDATE banks SET bank_name=$1,bank_kridit_sum=$2,bank_kridit_time=$3,bank_email=$4,bank_inform=$5,bank_media=$6 WHERE bank_id=$7 RETURNING *";
const UPDATE_BANK =
  "UPDATE banks SET bank_name=$1,bank_kridit_sum=$2,bank_kridit_time=$3,bank_email=$4,bank_inform=$5 WHERE bank_id=$6 RETURNING *";

// DELETE
const DELETE_BANK = "DELETE FROM banks WHERE bank_id = $1 RETURNING *";

// GET
const banks = (...values) => pgFetchAll(FIND_BANKS, values);
// POST
const createBank = (...values) => pgFetch(CREATE_BANK, values);
// PUT
const findBank = (...values) => pgFetch(FIND_BANK_UPDATE, values);
const updateBankMedia = (...values) => pgFetch(UPDATE_BANK_MEDIA, values);
const updateBank = (...values) => pgFetch(UPDATE_BANK, values);
// DELETE
const deleteBank = (...values) => pgFetch(DELETE_BANK, values);

module.exports = {
  banks,
  createBank,
  findBank,
  updateBankMedia,
  updateBank,
  deleteBank,
};
