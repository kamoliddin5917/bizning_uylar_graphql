const nodemailer = require("nodemailer");
const { EMAIL, PASSWORD } = require("../config");

async function nodemailerFn(userr, inform) {
  let transporter = nodemailer.createTransport({
    port: 587,
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
  });

  let mailOptions = {
    from: EMAIL,
    to: userr,
    subject: "Assalomu Alaykum",
    text: "Hush kelibsiz",
    html: inform,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    }
  });
}

module.exports = nodemailerFn;
