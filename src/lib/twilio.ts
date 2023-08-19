import twilio from 'twilio'
import { TWILIO_AUTH_TOKEN, TWILIO_SID } from '../configs/constants'

const accountSid = TWILIO_SID
const authToken = TWILIO_AUTH_TOKEN
const client = twilio(accountSid, authToken)

export async function sendTwilioMessage(to: string, body: string) {
  try {
    const message = await client.messages.create({
      body,
      to: `+91 ${to}`,
      from: `+1 417 609 3846`
    })
    return message
  } catch (error) {
    console.error('Error sending message:', error)
    return null
  }
}

// Download the helper library from https://www.twilio.com/docs/node/install
// Set environment variables for your credentials
// Read more at http://twil.io/secure
// const accountSid = "AC099d91a39dd489c58358ec40974a127d";
// const authToken = "7aed48d4d825e23cf4129435c6fae8c0";
// const verifySid = "VA43041cebe6cb2c9a2b25e3ef2f4922a8";
// const client = require("twilio")(accountSid, authToken);

// client.verify.v2
//   .services(verifySid)
//   .verifications.create({ to: "+919022688778", channel: "sms" })
//   .then((verification) => console.log(verification.status))
//   .then(() => {
//     const readline = require("readline").createInterface({
//       input: process.stdin,
//       output: process.stdout,
//     });
//     readline.question("Please enter the OTP:", (otpCode) => {
//       client.verify.v2
//         .services(verifySid)
//         .verificationChecks.create({ to: "+919022688778", code: otpCode })
//         .then((verification_check) => console.log(verification_check.status))
//         .then(() => readline.close());
//     });
//   });
