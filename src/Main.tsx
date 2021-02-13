import React from 'react'
import AppContainer from '~/ui/AppContainer'
import styled, { createGlobalStyle } from 'styled-components'
import FloorBackground from './scene/FloorBackground'
import FloorGrid from './scene/FloorGrid'
import Palms from './scene/Palms'
import Layer from './ui/Layer'
import Pigeons from './scene/Pigeons'
import Sun from './scene/Sun'
import Background from './scene/Background'

const GlobalStyle = createGlobalStyle`
  body {
    background: black;
    padding: 2em;
    display: flex;
    justify-content: center;
  }
`

const BORDER_COLOR = 'gray'

const ContentContainer = styled.div`
  border: 1px solid ${BORDER_COLOR};
  width: max(1280px, 80vw);
  height: max(720px, 45vw);
  overflow: hidden;
  position: relative;
`

export default function Main() {
  const layers = [Background, Sun, Palms, FloorBackground, FloorGrid, Pigeons]
  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <ContentContainer>
          {layers.map((LayerComponent, index) => (
            <Layer key={index}>
              <LayerComponent />
            </Layer>
          ))}
        </ContentContainer>
      </AppContainer>
    </>
  )
}
