import { FastifyPluginAsync } from 'fastify'
import AppError from '../../../lib/AppError.js'
import { getMeSchema } from './schema.js'

const meRoute: FastifyPluginAsync = async (fastify) => {
  fastify.get('/', { schema: getMeSchema }, async (request) => {
    if (request.isExpiredToken) {
      throw new AppError('UnauthorizedError', { isExpiredToken: true })
    }
    if (!request.user) {
      throw new AppError('UnauthorizedError', { isExpiredToken: false })
    }
    return request.user
  })
}

export default meRoute
