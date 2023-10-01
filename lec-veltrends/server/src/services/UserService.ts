import { RefreshTokenPayload } from './../lib/tokens'
import db from '../lib/db.js'
import bcyrpt from 'bcrypt'
import AppError, { isAppError } from '../lib/AppError.js'
import { generateToken, validateToken } from '../lib/tokens.js'
import { Token, User } from '@prisma/client'

const SALT_ROUNDS = 10

interface AuthParams {
  username: string
  password: string
}

class UserService {
  private static instance: UserService

  public static getInstance() {
    if (!UserService.instance) {
      UserService.instance = new UserService()
    }

    return UserService.instance
  }

  async createTokenItem(userId: number) {
    const token = await db.token.create({
      data: { userId },
    })
    return token
  }

  async generateTokens(user: User, tokenItem?: Token) {
    const { id: userId, username } = user
    const token = tokenItem ?? (await this.createTokenItem(user.id))
    const tokenId = token.id

    const [accessToken, refreshToken] = await Promise.all([
      generateToken({
        type: 'access_token',
        userId,
        tokenId,
        username,
      }),
      generateToken({
        type: 'refresh_token',
        tokenId,
        rotationCounter: token.rotationCounter,
      }),
    ])

    return { refreshToken, accessToken }
  }

  async register({ username, password }: AuthParams) {
    const exists = await db.user.findUnique({ where: { username } })

    if (exists) {
      throw new AppError('UserExistsError')
    }

    const hash = await bcyrpt.hash(password, SALT_ROUNDS)
    const user = await db.user.create({
      data: { username, passwordHash: hash },
    })
    const tokens = await this.generateTokens(user)

    return { tokens, user }
  }

  async login({ username, password }: AuthParams) {
    const user = await db.user.findUnique({ where: { username } })

    if (!user) {
      throw new AppError('AuthenticationError')
    }

    try {
      const result = await bcyrpt.compare(password, user.passwordHash)
      if (!result) {
        throw new AppError('AuthenticationError')
      }
    } catch (e) {
      if (isAppError(e)) {
        throw e
      }
      throw new AppError('UnknownError')
    }
    const tokens = await this.generateTokens(user)

    return { tokens, user }
  }

  async refreshToken(token: string) {
    try {
      const { tokenId, rotationCounter } =
        await validateToken<RefreshTokenPayload>(token)
      const tokenItem = await db.token.findUnique({
        where: {
          id: tokenId,
        },
        include: {
          user: true,
        },
      })

      if (!tokenItem) {
        throw new Error('Token not found')
      }
      if (tokenItem.blocked) {
        throw new Error('Token is blocked')
      }
      if (tokenItem.rotationCounter !== rotationCounter) {
        await db.token.update({
          where: {
            id: tokenId,
          },
          data: {
            blocked: true,
          },
        })
        throw new Error('Rotation counter does not match')
      }
      tokenItem.rotationCounter += 1
      await db.token.update({
        where: {
          id: tokenId,
        },
        data: {
          rotationCounter: tokenItem.rotationCounter,
        },
      })
      return this.generateTokens(tokenItem.user, tokenItem)
    } catch (e) {
      throw new AppError('RefreshTokenError')
    }
  }
}

export default UserService
