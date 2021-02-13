import React from 'react'
import styled from 'styled-components'
import animationConfig from '~/animations'

const Container = styled.div`
  width: 100%;
  height: 100%;
  ${animationConfig.rootElement}
`

const AppContainer: React.FC = ({ children }) => {
  return <Container>{children}</Container>
}

export default AppContainer
