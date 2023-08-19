import { model, Document, Schema, Types } from 'mongoose'

export interface TokenDocument extends Document {
  // user: Types.ObjectId
  email: string
  phone: string
  code: string
  expiresAt: Date
}

const TokenSchema = new Schema<TokenDocument>(
  {
    // user: { type: ObjectId, ref: 'User' },
    email: { type: String },
    phone: { type: String },
    code: { type: String, require: true },
    expiresAt: { type: Date }
  },
  {
    timestamps: true
  }
)

const Token = model<TokenDocument>('Token', TokenSchema)

export default Token
