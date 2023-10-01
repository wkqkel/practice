// https://blog.naver.com/sejun3278/221856823435
// https://velog.io/@kdkeiie8/NodeJS-nodemailer-네이버-계정으로-이용하기
//  https://spiralmoon.tistory.com/entry/Nodejs-env-환경변수
require("dotenv").config({ path: ".env" });
const nodeMailer = require("nodemailer");

const mailPoster = nodeMailer.createTransport({
  service: "naver",
  host: "smtp.naver.com",
  port: 587,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

const sendMail = (mailOption) => {
  mailPoster.sendMail(mailOption);
};

module.exports = mailPoster;
