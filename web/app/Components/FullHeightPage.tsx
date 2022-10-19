import styled, { createGlobalStyle } from 'styled-components'

const GlobalFullHeight = createGlobalStyle`
 html,body {
    height: 100%
 }
`

interface Props {
  children: React.ReactNode
}

const FullHeightPage = ({ children }: Props) => {
  return (
    <>
      <Page>{children}</Page>
      <GlobalFullHeight />
    </>
  )
}

const Page = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

export default FullHeightPage
