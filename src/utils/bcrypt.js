const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  try {
    const result = await bcrypt.hash(password, 10);
    return result;
  } catch (_) {}
};

const comparePassword = async (password, hash) => {
  try {
    const result = await bcrypt.compare(password, hash);
    return result;
  } catch (_) {}
};

module.exports = {
  hashPassword,
  comparePassword,
};
