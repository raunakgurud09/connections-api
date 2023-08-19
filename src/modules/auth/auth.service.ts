import { createHash } from '../../utils/createHash'
import { createTokenUser, sign } from '../../utils/jwt.utils'
import Users from './auth.provider'
import config from '../../configs/index.config'

export const create = async ({
  name,
  email,
  password,
  role,
  phoneNumber
}: any) => {
  // Create user
  const emailAlreadyExists = await Users.findUserBy('email', email)
  const phoneAlreadyExists = await Users.findUserBy('phoneNumber', phoneNumber)

  if (emailAlreadyExists) {
    return { message: 'Email already exist' }
  }

  if (phoneAlreadyExists) {
    return { message: 'Phone already exist' }
  }

  //pre userSchema to change password

  try {
    const user = await Users.createUser({
      name,
      email,
      password,
      role,
      phoneNumber
    })
    await Users.saveUser(user)
    // send verification email

    return user
  } catch (error) {
    return { message: 'Error in creating user' }
  }
}

export const login = async ({
  email,
  password
}: {
  email: string
  password: string
}) => {
  const user = await Users.findUserBy('email', email)

  if (!user) {
    return { message: 'Email not found' }
  }

  const isMatch = await Users.comparePassword(user, password)

  if (!isMatch) {
    return { message: 'Wrong password' }
  }

  const tokenUser = await createTokenUser(user)
  const accessToken = await sign(tokenUser, config.privateKey)

  return { accessToken, message: 'Login successful' }
}

export default {
  create,
  login
}
