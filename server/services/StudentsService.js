import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class StudentsService {
  async getAll(query = {}) {
    const students = await dbContext.Students.find(query).populate('creator', 'name picture')
    return students
  }

  async getById(id) {
    const student = await dbContext.Students.findById(id).populate('creator', 'name picture')
    if (!student) {
      throw new BadRequest('Invalid Student Id')
    }
    return student
  }

  async create(newStudent) {
    const student = await dbContext.Students.create(newStudent)
    await student.populate('creator', 'name picture')
    return student
  }

  async edit(update) {
    // get the student (if the id is bad, the getById handles it)
    const original = await this.getById(update.id)
    if (original.creatorId.toString() !== update.creatorId) {
      throw new BadRequest('You cannot edit that data')
    }
    original.name = update.name || original.name
    // save changes to db
    await original.save()
    return original
  }

  async remove(id, userId) {
    const original = await this.getById(id)
    if (original.creatorId.toString() !== userId) {
      throw new BadRequest('You cannot edit that data')
    }
    await dbContext.Students.findOneAndRemove({ _id: id })
  }
}

export const studentsService = new StudentsService()
