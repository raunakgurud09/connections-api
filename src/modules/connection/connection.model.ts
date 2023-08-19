import { Schema, model, Document, Types } from 'mongoose'

const { ObjectId, Number } = Schema.Types

export interface ConnectionDocument extends Document {
  user: Types.ObjectId
  connections: [Types.ObjectId]
}

const ConnectionSchema = new Schema<ConnectionDocument>(
  {
    user: { type: ObjectId, ref: 'User' },
    connections: [{ type: ObjectId, ref: 'Profile' }]
  },
  {
    timestamps: true
  }
)

const Connection = model<ConnectionDocument>('Connection', ConnectionSchema)

export default Connection
