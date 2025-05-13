import mongoose, { Schema, type Document } from "mongoose"

export interface IEvent extends Document {
  title: string
  platform: string
  startTime: Date
  endTime: Date
  url: string
  userId: string
  createdAt: Date
  updatedAt: Date
}

const EventSchema: Schema = new Schema({
  title: { type: String, required: true },
  platform: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  url: { type: String, required: true },
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

export default mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema)
