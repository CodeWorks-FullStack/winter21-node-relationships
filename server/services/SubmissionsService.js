import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class SubmissionsService {
  async getAll(query = {}) {
    const submissions = await dbContext.Submissions.find(query).populate('creator', 'name picture')
    return submissions
  }

  async getById(id) {
    const submission = await dbContext.Submissions.findById(id).populate('creator', 'name picture')
    if (!submission) {
      throw new BadRequest('Invalid Submission Id')
    }
    return submission
  }

  async create(newSubmission) {
    const submission = await dbContext.Submissions.create(newSubmission)
    await submission.populate('creator', 'name picture')
    await submission.populate('course')
    await submission.populate('student')
    return submission
  }

  async edit(update) {
    // get the submission (if the id is bad, the getById handles it)
    const original = await this.getById(update.id)
    if (original.creatorId.toString() !== update.creatorId) {
      throw new BadRequest('You cannot edit that data')
    }
    original.linkUrl = update.linkUrl || original.linkUrl
    // save changes to db
    await original.save()
    return original
  }

  async remove(id, userId) {
    const original = await this.getById(id)
    if (original.creatorId.toString() !== userId) {
      throw new BadRequest('You cannot edit that data')
    }
    await dbContext.Submissions.findOneAndRemove({ _id: id })
  }
}

export const submissionsService = new SubmissionsService()
