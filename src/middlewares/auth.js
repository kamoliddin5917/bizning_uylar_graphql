const { verify } = require("../utils/jwt");

module.exports = {
  userAuth: (token) => {
    try {
      if (!token) throw new Error("BAD_REQUEST_TOKEN!");

      const { userId } = verify(token);

      if (!userId)
        throw new Error("BU_JOYGA_KIRISH_MUMKINMAS_OKALANI_JOYI_BU :)");

      return userId;
    } catch (error) {
      throw new Error("YOMONAM_ADASHTIZU_LOGIN_YOKI_REGISTER_QILIN!");
    }
  },

  adminAuth: (token) => {
    try {
      if (!token) throw new Error("BAD_REQUEST_TOKEN!");

      const { adminId } = verify(token);

      if (!adminId)
        throw new Error("BU_JOYGA_KIRISH_MUMKINMAS_OKALANI_JOYI_BU :)");

      return adminId;
    } catch (error) {
      throw new Error("YOMONAM_ADASHTIZU_LOGIN_YOKI_REGISTER_QILIN!");
    }
  },
};
