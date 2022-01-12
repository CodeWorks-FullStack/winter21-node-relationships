import { Auth0Provider } from '@bcwdev/auth0provider'
import { coursesService } from '../services/CoursesService'
import { submissionsService } from '../services/SubmissionsService'
import BaseController from '../utils/BaseController'

export class CoursesController extends BaseController {
  constructor() {
    super('api/courses')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/submissions', this.getSubmissionsByCourseId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.remove)
  }

  async getAll(req, res, next) {
    try {
      // REVIEW query paramters
      const courses = await coursesService.getAll(req.query)
      return res.send(courses)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const course = await coursesService.getById(req.params.id)
      return res.send(course)
    } catch (error) {
      next(error)
    }
  }

  async getSubmissionsByCourseId(req, res, next) {
    try {
      const submissions = await submissionsService.getAll({ courseId: req.params.id })
      return res.send(submissions)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      // NOTE attach creatorId from the userInfo
      req.body.creatorId = req.userInfo.id
      const course = await coursesService.create(req.body)
      return res.send(course)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      // NOTE attach creatorId from the userInfo
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const updated = await coursesService.edit(req.body)
      return res.send(updated)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      await coursesService.remove(req.params.id, req.userInfo.id)
      return res.send('deleted')
    } catch (error) {
      next(error)
    }
  }
}
