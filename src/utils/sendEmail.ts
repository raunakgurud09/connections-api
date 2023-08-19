import nodemailer from 'nodemailer'
import handlebars from 'handlebars'
import fs from 'fs'
import path from 'path'
import { GMAIL_USER_APP_PASSWORD, GMAIL_USER_EMAIL } from '../configs/constants';
// require('dotenv').config()

const nodemailerConfig = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: GMAIL_USER_EMAIL,
    pass: GMAIL_USER_APP_PASSWORD,
  },
};


export const sendVerificationMail = async ({
  name,
  email,
  verificationToken,
  origin
}: any) => {
  const verifyEmail = `${origin}/user/verify-email?token=${verificationToken}&email=${email}`

  const filePath = path.join(__dirname, './sendEmail.html')
  const source = fs.readFileSync(filePath, 'utf-8').toString()
  const template = handlebars.compile(source)

  const replacements = {
    name,
    verifyEmail
  }

  const htmlToSend = template(replacements)

  const transporter = nodemailer.createTransport(nodemailerConfig)

  const mailOptions = {
    from: process.env.GMAIL_USER_EMAIL,
    to: email,
    subject: 'Verify your email',
    text: `Hello ${name}
    This is to verify your email click on the link 
    ${verifyEmail}`,
    html: htmlToSend
  }
  const info = await transporter.sendMail(mailOptions)
  return info
}
