import styled from 'styled-components'
import Button from './Button'
import LabelInput from './LabelInput'
import QuestionLink from './QuestionLink'

interface Props {
  mode: 'login' | 'register'
}

const authDescription = {
  login: {
    usernamePlaceholder: '아이디를 입력하세요.',
    passwordPlaceholder: '비밀번호를 입력하세요.',
    buttonText: '로그인',
    question: '계정이 없으신가요',
    actionText: '회원가입',
    actionLink: '/register',
  },
  register: {
    usernamePlaceholder: '5~20자 사이의 영문 소문자, 숫자, _ 사용',
    passwordPlaceholder: '8자 이상, 영문/숫자/특수문자 중 2가지 이상 입력',
    buttonText: '회원가입',
    question: '계정이 이미 있으신가요',
    actionText: '로그인',
    actionLink: '/login',
  },
} as const

const AuthForm = ({ mode }: Props) => {
  const { usernamePlaceholder, passwordPlaceholder, buttonText, actionText, question, actionLink } =
    authDescription[mode]

  return (
    <Block>
      <InputGroup>
        <LabelInput label="email" placeholder={usernamePlaceholder} />
        <LabelInput label="비밀번호" placeholder={passwordPlaceholder} />
      </InputGroup>
      <ActionsBox>
        <Button layoutMode="fullWidth">{buttonText}</Button>
        <QuestionLink question={question} name={actionText} to={actionLink} />
      </ActionsBox>
    </Block>
  )
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  flex: 1;
  justify-content: space-between;
`
const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const ActionsBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`
export default AuthForm
