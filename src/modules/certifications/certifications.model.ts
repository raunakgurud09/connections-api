import { Schema, model, Document, Types } from 'mongoose'

const { ObjectId, Number } = Schema.Types

export interface CertificationDocument extends Document {
  profile: Types.ObjectId
  name: string
  from: string
  image: string
}

const CertificationSchema = new Schema<CertificationDocument>(
  {
    profile: { type: ObjectId, ref: 'Profile' },
    name: { type: String, required: true },
    from: { type: String, required: true },
    image: { type: String, required: true, default: '' }
  },
  { timestamps: true }
)

const Certification = model<CertificationDocument>(
  'Certification',
  CertificationSchema
)

export default Certification
