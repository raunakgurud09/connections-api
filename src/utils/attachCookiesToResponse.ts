import { Response } from 'express'
import { oneDayExpire } from '../configs/constants'

export const attachCookiesToResponse = (
  res: Response,
  toAttach: string,
  options: any
) => {

  const expiration_time = oneDayExpire

  res.cookie(toAttach, options, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === 'production',
    // signed: true,
    expires: new Date(Date.now() + expiration_time)
  })
}
