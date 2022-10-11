import db from '../lib/db.js'
import bcyrpt from 'bcrypt'
import AppError, { isAppError } from '../lib/AppError.js'
import { generateToken } from '../lib/tokens.js'
import { User } from '@prisma/client'

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

  async generateTokens(user: User) {
    const { id: userId, username } = user

    const [accessToken, refreshToken] = await Promise.all([
      generateToken({
        type: 'access_token',
        userId,
        tokenId: 1,
        username,
      }),
      generateToken({
        type: 'refresh_token',
        tokenId: 1,
        rotationCounter: 1,
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
      // 프로미스이므로 try catch
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
}

export default UserService
