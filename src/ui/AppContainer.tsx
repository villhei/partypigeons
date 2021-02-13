import React from 'react'
import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
    0% { opacity: 0; }
    100% { opacity: 1; }
`

const Container = styled.div`
  width: 100%;
  height: 100%;
  animation-name: ${fadeIn};
  animation-duration: 1s;
  animation-iteration-count: 1;
`

const AppContainer: React.FC = ({ children }) => {
  return <Container>{children}</Container>
}

export default AppContainer
