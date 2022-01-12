import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const CourseSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    level: { type: Number, required: true },
    creatorId: { type: ObjectId, ref: 'Profile', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

// Allows population of a fake property (think like a 'get')
CourseSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Profile'
})
