const nodemailer = require('nodemailer');
require('dotenv').config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: 'smtp.meta.ua',
  port: 465, // 25, 465, 2525
  secure: true,
  auth: {
    user: 'andrii.radchenko@meta.ua',
    pass: META_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async data => {
  /* 
  const email = {
  to: 'd4100kx@gmail.com',
  from: 'andrii.radchenko@meta.ua',
  subject: 'Test email',
  html: '<p><strong>Test email</strong> from localhost:3000</p>',
  };
 */
  const email = { ...data, from: 'andrii.radchenko@meta.ua' };
  await transport.sendMail(email);
  console.log('Email send success');
  return true;
};

module.exports = sendEmail;
