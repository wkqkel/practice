import axios from 'axios'

type ErrorName =
  | 'UserExistsError'
  | 'AuthenticationError'
  | 'UnknownError'
  | 'UnauthorizedError'
  | 'BadRequestError'
  | 'RefreshTokenError'

interface ErrorPayloads {
  UserExistsError: undefined
  AuthenticationError: undefined
  UnknownError: undefined
  UnauthorizedError: {
    isExpiredToken: boolean
  }
  BadRequestError: undefined
  RefreshTokenError: undefined
}

interface AppError {
  statusCode: number
  message: string
  name: ErrorName
  payload?: ErrorPayloads[ErrorName]
}

export function isAppError(error: any): error is AppError {
  return (
    error?.statusCode !== undefined && error?.message !== undefined && error?.name !== undefined
  )
}

// 이게 axios에러일텐데 그게 reponse.error안에 들어있음.
// 이러면 extractError 하면 앱에러를 가지고 올 수 있고, 없으면 모르는 에러

export function extractError(error: any): AppError {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data
    if (isAppError(data)) {
      return data
    }
  }

  return {
    statusCode: 500,
    message: 'Unknown error',
    name: 'UnknownError',
  }
}
