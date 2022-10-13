import { FastifyPluginAsync, FastifyReply } from 'fastify'
import AppError from '../../../lib/AppError.js'
import UserService from '../../../services/UserService.js'
import { loginSchema, registerSchema, refreshTokenSchema } from './schema.js'
import { AuthBody } from './types.js'

const authRoute: FastifyPluginAsync = async (fastify) => {
  const userService = UserService.getInstance()

  fastify.post<{ Body: AuthBody }>(
    '/login',
    { schema: loginSchema },
    async (request, reply) => {
      const authResult = await userService.login(request.body)

      setTokenCookie(reply, authResult.tokens)

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

  fastify.post<{ Body: { refreshToken?: string } }>(
    '/refresh',
    { schema: refreshTokenSchema },
    async (request, reply) => {
      const refreshToken =
        request.body.refreshToken ?? request.cookies.refresh_token ?? ''
      if (!refreshToken) {
        throw new AppError('BadRequestError')
      }
      const tokens = await userService.refreshToken(refreshToken)
      setTokenCookie(reply, tokens)
      return tokens // 나중에 바로 result없이 리턴해도 되는지 체크!
    },
  )
}

function setTokenCookie(
  reply: FastifyReply,
  tokens: { accessToken: string; refreshToken: string },
) {
  reply.setCookie('access_token', tokens.accessToken, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60),
    path: '/',
  })
  reply.setCookie('refresh_token', tokens.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    path: '/',
  })
}

export default authRoute
