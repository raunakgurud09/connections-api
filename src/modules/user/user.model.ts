import { model, Document, Schema } from 'mongoose'
// import {HookNextFunction} from "@types/mongoose"
import bcrypt from 'bcrypt'

export interface UserDocument extends Document {
  email: string
  name: {
    firstName: string
    lastName: string
  }
  password: string
  role: string
  phoneNumber?: string
  image: string
  isVerified: boolean
  isPhoneVerified: boolean
  verificationToken?: string
  cover_coins: number
  googleId?: string
  createdAt: Date
  updatedAt: Date
  comparePassword: (candidatePassword: string) => boolean
}

const UserSchema = new Schema<UserDocument>({
  email: { type: String, require: true, unique: true },
  name: {
    firstName: { type: String, require: true },
    lastName: { type: String, require: true }
  },
  password: { type: String, require: true },
  phoneNumber: { type: String, require: false },
  role: {
    type: String,
    default: 'user',
    enum: ['admin', 'user','pro']
  },
  image: {
    type: String,
    default: ''
  },
  isVerified: { type: Boolean, default: false },
  isPhoneVerified: { type: Boolean, default: false },
  verificationToken: { type: String },
  googleId: { type: String, require: false }
})

UserSchema.pre('save', async function (next) {
  const user = this as UserDocument

  if (!user.isModified('password')) return next()

  const salt = await bcrypt.genSalt(10)
  const hash: string = bcrypt.hashSync(user.password, salt)

  user.password = hash
  return next()
})

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const user = this as UserDocument
  return bcrypt.compare(candidatePassword, user.password).catch((e) => false)
}

const User = model<UserDocument>('User', UserSchema)

export default User
