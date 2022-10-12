import { FastifySchema } from 'fastify'

import { userSchema } from '../../../schema/userSchema.js'
import { createAppErrorSchema } from './../../../lib/AppError.js'

const authResultSchema = {
  type: 'object',
  properties: {
    tokens: {
      type: 'object',
      properties: {
        accessToken: { type: 'string' },
        refreshToken: { type: 'string' },
      },
    },
    user: userSchema,
  },
}

// create an authBodySchema that has a username and password
const authBodySchema = {
  type: 'object',
  properties: {
    username: { type: 'string' },
    password: { type: 'string' },
  },
}
export const registerSchema: FastifySchema = {
  body: authBodySchema,
  response: {
    200: authResultSchema,
    409: createAppErrorSchema({
      name: 'UserExistsError',
      message: 'User already exists',
      statusCode: 409,
    }),
  },
}

export const loginSchema: FastifySchema = {
  body: authBodySchema,
  response: {
    200: authResultSchema,
    401: createAppErrorSchema({
      name: 'AuthenticationError',
      message: 'Invalid username or password',
      statusCode: 401,
    }),
  },
}
