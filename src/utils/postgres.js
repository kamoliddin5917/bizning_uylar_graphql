const { Pool } = require("pg");
const { DB } = require("../config");

const pool = new Pool({ connectionString: DB });

const pgFetchAll = async (query, params) => {
  let client = await pool.connect();
  try {
    let data = await client.query(query, params);
    return data.rows;
  } finally {
    client.release();
  }
};

const pgFetch = async (query, params) => {
  try {
    let [row] = await pgFetchAll(query, params);
    return row;
  } catch (_) {}
};

module.exports = { pgFetchAll, pgFetch };
