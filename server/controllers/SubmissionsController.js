import { Auth0Provider } from '@bcwdev/auth0provider'
import { submissionsService } from '../services/SubmissionsService'
import BaseController from '../utils/BaseController'

export class SubmissionsController extends BaseController {
  constructor() {
    super('api/submissions')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.remove)
  }

  async getAll(req, res, next) {
    try {
      // REVIEW query paramters
      const submissions = await submissionsService.getAll(req.query)
      return res.send(submissions)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const course = await submissionsService.getById(req.params.id)
      return res.send(course)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      // NOTE attach creatorId from the userInfo
      req.body.creatorId = req.userInfo.id
      const course = await submissionsService.create(req.body)
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
      const updated = await submissionsService.edit(req.body)
      return res.send(updated)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      await submissionsService.remove(req.params.id, req.userInfo.id)
      return res.send('deleted')
    } catch (error) {
      next(error)
    }
  }
}
