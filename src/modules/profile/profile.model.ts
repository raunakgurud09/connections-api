import { Schema, model, Document, Types } from 'mongoose'

const { ObjectId, Number } = Schema.Types

export interface ProfileDocument extends Document {
  user: Types.ObjectId
  name: string
  email: string
  phone: string
  image: string
  about: string
  connections: [Types.ObjectId]
  skills: [string]
}

const ProfileSchema = new Schema<ProfileDocument>(
  {
    user: { type: ObjectId, ref: 'User' },
    name: { type: String, require: true },
    email: { type: String, require: true },
    phone: { type: String, require: true },
    image: { type: String, require: true, default: '' },
    about: { type: String },
    connections: [{ type: ObjectId, ref: 'Profile' }],
    skills: [{ type: String }]
  },
  {
    timestamps: true
  }
)

const Profile = model<ProfileDocument>('Profile', ProfileSchema)

export default Profile
