const { pgFetchAll, pgFetch } = require("../utils/postgres");

// GET
const FIND_HOUSES = "SELECT * FROM houses";
const FIND_HOUSE_BANKS = "SELECT * FROM banks WHERE bank_kridit_sum >= $1";
// POST
const CREATE_HOUSE =
  "INSERT INTO houses(house_floor,house_room,house_kvm,house_kvm_sum,house_media,house_inform,house_complex) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *";
// PUT
const FIND_HOUSE_UPDATE = "SELECT * FROM houses WHERE house_id = $1";
const UPDATE_HOUSE_MEDIA =
  "UPDATE houses SET house_floor=$1,house_room=$2,house_kvm=$3,house_kvm_sum=$4,house_inform=$5,house_media=$6 WHERE house_id=$7 RETURNING *";
const UPDATE_HOUSE =
  "UPDATE houses SET house_floor=$1,house_room=$2,house_kvm=$3,house_kvm_sum=$4,house_inform=$5 WHERE house_id=$6 RETURNING *";
// DELETE
const DELETE_HOUSE = "DELETE FROM houses WHERE house_id = $1 RETURNING *";

// GET
const houses = (...values) => pgFetchAll(FIND_HOUSES, values);
const banks = (...values) => pgFetchAll(FIND_HOUSE_BANKS, values);
// POST
const createHouse = (...values) => pgFetch(CREATE_HOUSE, values);
// PUT
const findHouse = (...values) => pgFetch(FIND_HOUSE_UPDATE, values);
const updateHouseMedia = (...values) => pgFetch(UPDATE_HOUSE_MEDIA, values);
const updateHouse = (...values) => pgFetch(UPDATE_HOUSE, values);
// DELETE
const deleteHouse = (...values) => pgFetch(DELETE_HOUSE, values);

module.exports = {
  houses,
  banks,
  createHouse,
  findHouse,
  updateHouseMedia,
  updateHouse,
  deleteHouse,
};
