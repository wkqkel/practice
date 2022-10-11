import { FastifyPluginAsync } from 'fastify'
import UserService from '../../../services/UserService.js'
import { loginSchema, registerSchema } from './schema.js'
import { AuthBody } from './types.js'

const authRoute: FastifyPluginAsync = async (fastify) => {
  const userService = UserService.getInstance()

  fastify.post<{ Body: AuthBody }>(
    '/login',
    { schema: loginSchema },
    async (request) => {
      return await userService.login(request.body)
    },
  )
  // 일반적으론 회원가입할 때 요청을 더 많이 받으므로 <>안을 똑같이 못 쓸것
  fastify.post<{ Body: AuthBody }>(
    '/register',
    { schema: registerSchema },
    async (request) => {
      return await userService.register(request.body)
    },
  )
}

export default authRoute
