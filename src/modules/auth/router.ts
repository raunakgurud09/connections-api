import express from 'express'

const Router = express.Router()

import {
  register,
  login,
  logout,
  loginViaGoogle,
  sendPhoneVerificationOTP,
  checkPhoneOTP,
  sendMail
} from './auth.controller'

Router.route('/register').post(register)
Router.route('/login').post(login)
Router.route('/logout').delete(logout)
Router.route('/google').post(loginViaGoogle)

Router.route('/send-phone').post(sendPhoneVerificationOTP)
Router.route('/check-phone').post(checkPhoneOTP)

Router.route('/send-verification-email').post(sendMail)

export { Router as authRouter }
