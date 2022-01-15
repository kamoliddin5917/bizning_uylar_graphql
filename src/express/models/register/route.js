const { Router } = require("express");

const router = Router();

const controller = require("./controller");

router
  .post("/register", controller.REGISTER)
  .post("/verify", controller.VERIFICATION);

module.exports = router;
