import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const SubmissionSchema = new Schema(
  {
    linkUrl: { type: String, required: true },
    studentId: { type: ObjectId, ref: 'Student', required: true },
    courseId: { type: ObjectId, ref: 'Course', required: true },
    creatorId: { type: ObjectId, ref: 'Profile', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

// Allows population of a fake property (think like a 'get')
SubmissionSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Profile'
})

SubmissionSchema.virtual('student', {
  localField: 'studentId',
  foreignField: '_id',
  justOne: true,
  ref: 'Student'
})

SubmissionSchema.virtual('course', {
  localField: 'courseId',
  foreignField: '_id',
  justOne: true,
  ref: 'Course'
})
