import React from 'react'
import styled, { keyframes } from 'styled-components'
import sun from './sun.svg'

const slideIn = keyframes`
    0% { margin-bottom: -50%; }
    100% { margin-bottom: 0; }
`

const StyledImg = styled.img`
  align-self: center;
  height: 65%;
  width: 100%;
  margin-bottom: -50%;
  animation-name: ${slideIn};
  animation-duration: 4s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
`

export const Sun = () => <StyledImg src={sun} />

export default Sun
