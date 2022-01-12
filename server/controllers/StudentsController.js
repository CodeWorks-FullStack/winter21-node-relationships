import { Auth0Provider } from '@bcwdev/auth0provider'
import { studentsService } from '../services/StudentsService'
import { submissionsService } from '../services/SubmissionsService'
import BaseController from '../utils/BaseController'

export class StudentsController extends BaseController {
  constructor() {
    super('api/students')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/submissions', this.getSubmissionsByStudentId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.remove)
  }

  async getAll(req, res, next) {
    try {
      // REVIEW query paramters
      const students = await studentsService.getAll(req.query)
      return res.send(students)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const student = await studentsService.getById(req.params.id)
      return res.send(student)
    } catch (error) {
      next(error)
    }
  }

  async getSubmissionsByStudentId(req, res, next) {
    try {
      const submissions = await submissionsService.getAll({ studentId: req.params.id })
      return res.send(submissions)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      // NOTE attach creatorId from the userInfo
      req.body.creatorId = req.userInfo.id
      const student = await studentsService.create(req.body)
      return res.send(student)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      // NOTE attach creatorId from the userInfo
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const updated = await studentsService.edit(req.body)
      return res.send(updated)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      await studentsService.remove(req.params.id, req.userInfo.id)
      return res.send('deleted')
    } catch (error) {
      next(error)
    }
  }
}
