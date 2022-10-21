import { type ActionFunction, json } from '@remix-run/node'

import AuthForm from '~/Components/AuthForm'
import FullHeightPage from '~/Components/FullHeightPage'
import Header from '~/Components/Header'
import HeaderBackButton from '~/Components/HeaderBackButton'
import { useGoBack } from '~/hooks/useGoBack'
import { register } from '~/lib/auth'

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData()
  const username = form.get('username')
  const password = form.get('password')
  if (typeof username !== 'string' || typeof password !== 'string') return
  const result = register({ username, password })
  return json(result)
}

const Register = () => {
  const goBack = useGoBack()
  return (
    <FullHeightPage>
      <Header title="회원가입" headerLeft={<HeaderBackButton onClick={goBack} />} />
      <AuthForm mode="register" />
    </FullHeightPage>
  )
}

export default Register
