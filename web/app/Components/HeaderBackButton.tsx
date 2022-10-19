import styled from 'styled-components'

import ArrowLeft from './vectors/ArrowLeft'

interface Props {
  onClick?: () => void
}

const HeaderBackButton = ({ onClick }: Props) => {
  return (
    <IconButton onClick={onClick}>
      <ArrowLeft />
    </IconButton>
  )
}

const IconButton = styled.button`
  padding: 0;
  border: none;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  margin-left: -8px;
`

export default HeaderBackButton
