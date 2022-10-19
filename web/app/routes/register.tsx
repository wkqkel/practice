import styled from 'styled-components'
import Header from '~/Components/Header'
import HeaderBackButton from '~/Components/HeaderBackButton'
import { useGoBack } from '~/hooks/useGoback'

const Register = () => {
  const goBack = useGoBack
  return (
    <Page>
      <Header title="회원가입" headerLeft={<HeaderBackButton onClick={goBack} />} />
    </Page>
  )
}

const Page = styled.div`
  height: 100%;
`

export default Register
