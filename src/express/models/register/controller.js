const cron = require("node-cron");
const { hashPassword } = require("../../../utils/bcrypt");
const nodemailerFn = require("../../../utils/nodemailer");
const { sign, verify } = require("../../../utils/jwt");

module.exports = {
  REGISTER: async (req, res) => {
    try {
      console.log("ok");
      const { firstName, lastName, email, password } = req.body;

      if (!firstName || !lastName || !email || !password)
        return res.status(400).end("BAD_REQUEST!");

      if (
        !password.match(
          /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{7,17}$/
        )
      )
        return res
          .status(400)
          .end(
            "Kamida 7 ta belgi, ko'pi bn 17 ta belgi, kotta-kichkina harf, belgi, son bo'lishi kerak!"
          );

      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
        return res.status(400).end(`This is not email (${email})`);

      //   const findEmail = await model.findEmail(email);

      //   if (findEmail)
      //     return res.status(400).end(`This email already use (${email})`);

      const code = String(Math.floor(100000 + Math.random() * 900000));
      console.log(code);
      const hashedPassword = await hashPassword(password);
      console.log(hashedPassword);
      //   const createUser = await model.createUser(
      //     firstName,
      //     lastName,
      //     email,
      //     hashedPassword,
      //     code
      //   );

      //   if (!createUser) return res.status(500).end("SERVER_CREATED_ERROR");

      //   nodemailerFn(email, `COD: ${code}`);

      //   const token = sign({ userVerify: createUser.id });

      res.status(200).json({ message: "Email sended", token: "ok" });

      const verification = await cron.schedule("*/10 * * * *", () => {
        // const deletedUser = model.deletedUser(createUser.id);

        console.log("deletedUser");
      });
    } catch (error) {
      console.log(error);
      return res.status(500).end("SERVER_ERROR!");
    }
  },
};
