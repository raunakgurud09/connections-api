import dotenv from 'dotenv'
dotenv.config()

export const payment = {
  MERCHANT_ID: process.env.MERCHANT_KEY,
  YOUR_WEBSITE_NAME: process.env.YOUR_WEBSITE_NAME,

  CF_APP_ID: process.env.APP_ID as string,  
  CF_SECRET_KEY:process.env.SECRET_KEY as string
}
