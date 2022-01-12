import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { CourseSchema } from '../models/Course'
import { StudentSchema } from '../models/Student'
import { SubmissionSchema } from '../models/Submission'

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Students = mongoose.model('Student', StudentSchema);
  Courses = mongoose.model('Course', CourseSchema);
  Submissions = mongoose.model('Submission', SubmissionSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
}

export const dbContext = new DbContext()
