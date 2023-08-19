import { Schema, model, Document, Types } from 'mongoose'

const { ObjectId, Number } = Schema.Types

export interface EducationDocument extends Document {
  profile: Types.ObjectId
  institution: string
  degree: string
  majors: string
  description: string
  marks: string
  duration: {
    start: Date
    end: Date
  }
  ongoing: boolean
}

const EducationSchema = new Schema<EducationDocument>(
  {
    profile: { type: ObjectId, ref: 'Profile' },
    institution: { type: String, require: true },
    degree: { type: String, require: true },
    majors: { type: String, require: true },
    description: { type: String },
    marks: { type: String },
    duration: {
      start: { type: Date },
      end: { type: Date }
    },
    ongoing: { type: Boolean }
  },
  { timestamps: true }
)

const Education = model<EducationDocument>('Education', EducationSchema)

export default Education
