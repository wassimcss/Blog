const nodemailer = require("nodemailer");
//const sendgridTransport = require("nodemailer-sendgrid-transport");
const mailGun = require("nodemailer-mailgun-transport");

const sendEmail = (to, url, txt) => {
    // const transporter = nodemailer.createTransport(sendgridTransport({
    //     auth: {
    //         api_key: process.env.SENDGRID_API_KEY, // TODO:

    //       },
    //       tls: {
    //         rejectUnauthorized: false,
    //       }
    // }))
    const auth = {
      auth: {
        api_key: process.env.API_KEY, // TODO:
        domain: process.env.DOMAIN, // TODO:
      },
      tls: {
        rejectUnauthorized: false,
      },
    };
    let transporter = nodemailer.createTransport(mailGun(auth));

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: to,
      subject: "Mail confirmation",
      html: `
              <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
              <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to **website**.</h2>
              <p>Congratulations! You're almost set to start using **website**.
                  Just click the button below to validate your email address.
              </p>

              <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>

              <p>If the button doesn't work for any reason, you can also click on the link below:</p>

              <div href=${url}>${url}</div>
              </div>
          `,
    };

    transporter.sendMail(mailOptions, (err, infor) => {
      if (err) return err;
      return console.log( infor);
    });
  };
// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

// const sendEmail = (to) => {
//   const sgMail = require("@sendgrid/mail");
//   sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//   const msg = {
//     to: to, // Change to your recipient
//     from: "wassim.ahmad@enis.tn", // Change to your verified sender
//     subject: "Sending with SendGrid is Fun",
//     text: "and easy to do anywhere, even with Node.js",
//     html: `<strong>and easy to do anywhere, even with Node.js</strong>`,
//   };
//   sgMail
//     .send(msg)
//     .then(() => {
//       console.log("Email sent");
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };

module.exports = sendEmail;

