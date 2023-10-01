import { type ActionFunction, json } from '@remix-run/node'
import { type ThrownResponse, useCatch } from '@remix-run/react'

import AuthForm from '~/Components/AuthForm'
import FullHeightPage from '~/Components/FullHeightPage'
import Header from '~/Components/Header'
import HeaderBackButton from '~/Components/HeaderBackButton'
import { useGoBack } from '~/hooks/useGoBack'
import { register } from '~/lib/api/auth'
import { type AppError, extractError } from '~/lib/api/error'

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData()
  const username = form.get('username')
  const password = form.get('password')

  if (typeof username !== 'string' || typeof password !== 'string') return

  try {
    const { result, headers } = await register({ username, password })
    return json(result, {
      headers,
    })
  } catch (e) {
    const error = extractError(e)
    throw json(error, {
      status: error.statusCode,
    })
  }
}

interface Props {
  error?: AppError
}

const Register = ({ error }: Props) => {
  const goBack = useGoBack()
  return (
    <FullHeightPage>
      <Header title="회원가입" headerLeft={<HeaderBackButton onClick={goBack} />} />
      <AuthForm mode="register" error={error} />
    </FullHeightPage>
  )
}

export default Register

export function CatchBoundary() {
  const caught = useCatch<ThrownResponse<number, AppError>>()

  return <Register error={caught.data} />
}
