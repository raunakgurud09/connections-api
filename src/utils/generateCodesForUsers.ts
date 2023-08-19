import { UserDocument } from '../modules/user/user.model'
import optGenerator from 'otp-generator'

export const generateCodesForUser = (user: UserDocument, discount: string) => {
  const codes = []

  codes.push(`${user.name.firstName.toUpperCase()}` + discount)
  codes.push(`${user.name.lastName.toUpperCase()}` + discount)
  codes.push(
    `${user.name.firstName[0]}${user.name.lastName}`.toUpperCase() + discount
  )
  codes.push(
    `${user.name.lastName[0]}${user.name.firstName}`.toUpperCase() + discount
  )
  codes.push(
    `${user.name.lastName}${user.name.firstName}`.toUpperCase() +
      Math.floor(Math.random() * 100)
  )

  return codes
}

function gen() {
  return optGenerator.generate(6, {
    digits: false,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: true,
    specialChars: false
  })
}

export function NumGen() {
  return optGenerator.generate(6, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false
  })
}

export const randomCodes = () => {
  const codes = []

  codes.push(gen())
  codes.push(gen())
  codes.push(gen())
  codes.push(gen())
  codes.push(gen())
  codes.push(gen())
  codes.push(gen())
  codes.push(gen())
  codes.push(gen())
  codes.push(gen())
  codes.push(gen())

  return codes
}