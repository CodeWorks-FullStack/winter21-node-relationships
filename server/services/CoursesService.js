import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class CoursesService {
  async getAll(query = {}) {
    const courses = await dbContext.Courses.find(query).populate('creator', 'name picture')
    return courses
  }

  async getById(id) {
    const course = await dbContext.Courses.findById(id).populate('creator', 'name picture')
    if (!course) {
      throw new BadRequest('Invalid Course Id')
    }
    return course
  }

  async create(newCourse) {
    const course = await dbContext.Courses.create(newCourse)
    await course.populate('creator', 'name picture')
    return course
  }

  async edit(update) {
    // get the course (if the id is bad, the getById handles it)
    const original = await this.getById(update.id)
    if (original.creatorId.toString() !== update.creatorId) {
      throw new BadRequest('You cannot edit that data')
    }
    original.name = update.name || original.name
    original.description = update.description || original.description
    original.level = update.level || original.level
    // save changes to db
    await original.save()
    return original
  }

  async remove(id, userId) {
    const original = await this.getById(id)
    if (original.creatorId.toString() !== userId) {
      throw new BadRequest('You cannot edit that data')
    }
    await dbContext.Courses.findOneAndRemove({ _id: id })
  }
}

export const coursesService = new CoursesService()
