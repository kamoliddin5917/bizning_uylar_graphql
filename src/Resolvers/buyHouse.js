const model = require("../models/buy");
const nodemailerFn = require("../utils/nodemailer");

module.exports = {
  Mutation: {
    buy: async (_, { houseId, bankId, firstname, lastname, email, tell }) => {
      try {
        const findUser = await model.findUser(houseId);
        const findBank = await model.findBank(bankId);

        if (!findUser || !findBank) throw new Error("SERVER_FIND_ERROR!");

        const infoClient = `
            <h1> Saytimiz orqali uy va bank tanlaganingiz uchun rahmat, tez orada siz bilan bog'lanishadi!</h1>
            <h4>Ajoyib tanlov!</h4>
            <p>${findUser.user_firstname} - firmasi eng zo'r firmaladan bittasi!</p>
            <p>${findBank.bank_name} - bank eng zo'r bankladan bittasi!</p>
            `;
        const infoUser = `
            <h1> Saytimiz orqali yengi Client uyizi sotib olmoqchi! </h1>
            <p> ISM: ${firstname} ${lastname}, TEL: ${tell}, Email: ${email}</p>
            `;
        const infoBank = `
            <h1> Saytimiz orqali yengi Client sizdan kredit olmoqchi! </h1>
            <p> ISM: ${firstname} ${lastname}, TEL: ${tell}, Email: ${email}</p>
            `;

        nodemailerFn(email, infoClient);
        nodemailerFn(findUser.user_email, infoUser);
        nodemailerFn(findBank.bank_email, infoBank);

        return `${firstname} ${lastname} Tanlovingiz uchun rahmat siz bilan ${findUser.user_firstname} va ${findBank.bank_name} tez orada aloqaga chiqishadi!`;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};
