const cron = require("node-cron");
const model = require("./model");
const { hashPassword } = require("../../../utils/bcrypt");
const nodemailerFn = require("../../../utils/nodemailer");
const { sign, verify } = require("../../../utils/jwt");

module.exports = {
  REGISTER: async (req, res) => {
    try {
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

      const code = String(Math.floor(100000 + Math.random() * 900000));

      const hashedPassword = await hashPassword(password);

      const createUser = await model.createUser(
        firstName,
        lastName,
        email,
        hashedPassword,
        code
      );
      if (!createUser) return res.status(400).end("THIS_EMAIL_ALREADY_USED!");

      nodemailerFn(email, `COD: ${createUser.cod}`);

      const tokenReg = sign({ userVerify: createUser.id });

      res.status(200).json({ message: "EMAIL_SENDED_CODE", tokenReg });

      // const verification = await cron.schedule("10 * * * * *", async () => {
      //   const deletedUser = await model.deletedUser(createUser.id);
      //   console.log(deletedUser);
      // });

      setTimeout(async () => {
        const deletedUser = await model.deletedUser(createUser.id);

        console.log(deletedUser);
      }, 60 * 1000);
    } catch (error) {
      return res.status(500).end("SERVER_ERROR!");
    }
  },
  VERIFICATION: async (req, res) => {
    try {
      const { tokenreg } = req.headers;
      const { cod } = req.body;

      if (!tokenreg || !cod) return res.status(400).end("BAD_REQUEST!");

      const { userVerify } = verify(tokenreg);
      if (!userVerify) return res.status(400).end("BAD_REQUEST!");

      const findUser = await model.findUser(userVerify);
      if (!findUser)
        return res
          .status(400)
          .end("VOHTIZ_TUGADI_QAYTADAN_REGISTERATION_QILIN!");

      if (findUser.try_count >= 3) {
        const deletedUser = await model.deletedUser(findUser.id);

        if (!deletedUser) return res.status(500).end("SERVER_DELETED_ERROR!");

        return res
          .status(400)
          .end("VOHTIZ_TUGADI_QAYTADAN_REGISTERATION_QILIN!");
      }

      if (cod == findUser.cod) {
        const insertUser = await model.insertUser(
          findUser.firstname,
          findUser.lastname,
          findUser.email,
          findUser.password
        );
        const updateUser = await model.updateUser(userVerify);
        const token = sign({ userId: insertUser.user_id });

        return res.status(201).json({ message: "User created!", token });
      } else {
        const updateUserTry = await model.updateUserTry(
          findUser.try_count + 1,
          findUser.id
        );

        return res.status(400).end("YANA_URINIB_KO'RIN_BU_COD_XATO!");
      }
    } catch (error) {
      return res.status(500).end("SERVER_ERROR!");
    }
  },
};
