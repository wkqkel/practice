import { useNavigate } from '@remix-run/react'
import styled from 'styled-components'
import Header from '~/Components/Header'
import HeaderBackButton from '~/Components/HeaderBackButton'

const Login = () => {
  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1)
  }
  return (
    <Page>
      <Header title="로그인" headerLeft={<HeaderBackButton onClick={goBack} />} />
    </Page>
  )
}

const Page = styled.div`
  height: 100%;
`

export default Login
