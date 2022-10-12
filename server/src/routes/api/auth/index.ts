import { FastifyPluginAsync } from 'fastify'
import UserService from '../../../services/UserService.js'
import { loginSchema, registerSchema } from './schema.js'
import { AuthBody } from './types.js'

const authRoute: FastifyPluginAsync = async (fastify) => {
  const userService = UserService.getInstance()

  fastify.post<{ Body: AuthBody }>(
    '/login',
    { schema: loginSchema },
    async (request, reply) => {
      const authResult = await userService.login(request.body)

      reply.setCookie('access_token', authResult.tokens.accessToken, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60),
        path: '/',
      })
      reply.setCookie('refresh_token', authResult.tokens.refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        path: '/',
      })
      return authResult
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
