import { type ActionFunction, json } from '@remix-run/node'
import AuthForm from '~/Components/AuthForm'
import FullHeightPage from '~/Components/FullHeightPage'
import Header from '~/Components/Header'
import HeaderBackButton from '~/Components/HeaderBackButton'
import { useGoBack } from '~/hooks/useGoBack'

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData()
  const username = form.get('username')
  const password = form.get('password')
  await new Promise((resolve) => setTimeout(resolve, 3000))
  return json({ text: 'helloworld' })
}
const Login = () => {
  const goBack = useGoBack()
  return (
    <FullHeightPage>
      <Header title="로그인" headerLeft={<HeaderBackButton onClick={goBack} />} />
      <AuthForm mode="login" />
    </FullHeightPage>
  )
}

export default Login
