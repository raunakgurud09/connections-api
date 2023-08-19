import { Request, Response } from 'express'
import { createUserSchema } from './user.schema'
import Auth from './auth.service'
import validateRequest from '../../middleware/validate.middleware'
import { attachCookiesToResponse } from '../../utils/attachCookiesToResponse'
import User from '../user/user.model'
import { createTokenUser, sign } from '../../utils/jwt.utils'
import config from '../../configs/index.config'
// import { sendTwilioMessage } from '../../lib/twilio'
import { NumGen } from '../../utils/generateCodesForUsers'
import Token from './token.model'
import { z } from 'zod'
import crypto from 'crypto'
import { sendVerificationMail } from '../../utils/sendEmail'

export const register = async (req: Request, res: Response) => {
  validateRequest(createUserSchema) // Not working
  const { name, email, password, role, phoneNumber } = req.body

  if (!email && !password && !name) {
    return res.status(400).json({ message: 'Email and Password are required' })
  }

  const user = await Auth.create({ name, email, password, role, phoneNumber })

  // send mail from the name email phone

  res.status(200).json(user)
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body
  if (!email && !password) {
    return res.status(400).json({ message: 'Email and password are required.' })
  }

  const { accessToken, message } = await Auth.login({ email, password })

  if (!accessToken) return res.status(400).json(message)
  attachCookiesToResponse(res, 'x-access-token', accessToken)

  res.status(200).json({ token: accessToken, message })
  // console.log(res.header)
}

export const loginViaGoogle = async (req: Request, res: Response) => {
  const { user } = req.body

  if (!user)
    return res.status(402).json({ error: { message: 'user is required' } })

  try {
    const name = {
      firstName: user.name.firstName,
      lastName: user.name.lastName
    }
    const _name = user._name
    const email = user.email as string
    const googleId = user.sub
    const image = user.picture

    if (!user)
      return res.status(500).json({
        error: { message: 'Error in logging in. Please try again later' }
      })

    let _user = await User.findOne({
      googleId
    })

    // create user if does not exists in db
    if (!_user) {
      _user = await User.create({
        googleId,
        name,
        image,
        email
      })
    }

    const foundUser = await User.findOne({ googleId: _user.googleId })

    const tokenUser = await createTokenUser(foundUser)
    const accessToken = await sign(tokenUser, config.privateKey)

    // create access token and res

    attachCookiesToResponse(res, 'x-access-token', accessToken)
    res.status(200).json({ token: accessToken, message: 'Logged in' })
  } catch (error) {
    res.status(500).json({ message: 'Error in logging in' })
  }
}

export const sendPhoneVerificationOTP = async (req: Request, res: Response) => {
  const { phone } = req.body

  if (!phone) {
    return res.status(400).json({ message: 'Phone are required.' })
  }

  const code = NumGen()

  const expiresAt = new Date().getTime() + 300 * 1000 // 5 MIN

  try {
    const token = await Token.create({
      phone: phone,
      code,
      expiresAt
    })

    // const resp = await sendTwilioMessage(
    //   token.phone,
    //   `Your Connection verification code is:${token.code}`
    // )

    return res.status(201).json({ message: 'OTP sent' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
}

export const checkPhoneOTP = async (req: Request, res: Response) => {
  const { phone, code } = req.body

  if (!phone || !code)
    return res.status(400).json({ message: 'phone and code is required' })

  try {
    const verify = await Token.findOne({ phone: phone }).sort('-createdAt')

    if (!verify)
      return res.status(400).json({ message: 'This number is not found' })

    const now = new Date()
    if (now > verify?.expiresAt) {
      return res.status(400).json({ message: 'OTP expired' })
    }

    if (code !== verify.code)
      return res.status(400).json({ message: "Code doesn't match" })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Something went wrong' })
  }

  try {
    const user = await User.findOne({ phoneNumber: phone })
    if (!user) return res.status(400).json({ message: 'User not found' })

    user.isPhoneVerified = true
    await user.save()

    console.log(user)

    return res
      .status(200)
      .json({ message: 'your phone number is been verified' })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Something went wrong' })
  }
}

export const sendMail = async (req: Request, res: Response) => {
  const { email } = req.body
  if (!email) {
    return res.status(400).json({ message: 'Email is required' })
  }
  const user = await User.findOne({ email })

  if (!user) {
    return res.status(401).json({ message: 'No user with this email is found' })
  }
  const origin = 'https://example.com/api/v1'
  const verificationToken = crypto.randomBytes(40).toString('hex')

  user.verificationToken = verificationToken
  await user.save()

  try {
    const result = await sendVerificationMail({
      name: user.name,
      email,
      verificationToken,
      origin
    })

    return res.status(200).json({ result })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ message: 'Something went wrong' })
  }
}

export const verifyEmail = async (req: Request, res: Response) => {
  const { email } = req.body

  if (!email) {
    return res.status(400).json({ message: 'Phone are required.' })
  }

  const code = NumGen()

  const expiresAt = new Date().getTime() + 300 * 1000 // 5 MIN

  try {
    const token = await Token.create({
      email,
      code,
      expiresAt
    })

    // const resp = await sendTwilioMessage(
    //   token.phone,
    //   `Your verification code is:${token.code}`
    // )

    return res.status(201).json({ message: 'OTP sent' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
}

export const logout = async (req: Request, res: Response) => {
  res.cookie('refreshToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now())
  })
  res.status(200).json({ msg: 'user logged out!' })
}
