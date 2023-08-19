import { Schema, model, Document, Types } from 'mongoose'

const { ObjectId, Number } = Schema.Types

export interface ExperienceDocument extends Document {
  profile: Types.ObjectId
  company: string
  role: string
  responsibilities: string
  duration: {
    start: Date
    end: Date
  }
  ongoing: boolean
}

const ExperienceSchema = new Schema<ExperienceDocument>(
  {
    profile: { type: ObjectId, ref: 'Profile' },
    company: { type: String, required: true },
    role: { type: String, required: true },
    responsibilities: { type: String, required: true, default: '' },
    duration: {
      start: { type: Date },
      end: { type: Date }
    },
    ongoing: { type: Boolean }
  },
  {
    timestamps: true
  }
)

const Experience = model<ExperienceDocument>('Experience', ExperienceSchema)

export default Experience
