import React from 'react'
import styled, { keyframes } from 'styled-components'
import palms from './palms.svg'

const shakeAnimation = keyframes`
    0% { transform: skewX(0deg); }
    10% { transform: skewX(10deg);}
    75% { transform: skewX(-5deg) }
    100% { transform: skewX(0deg); }
`

const StyledImg = styled.img`
  align-self: center;
  height: 65%;
  width: 100%;
  margin-top: -15%;
  transform-origin: bottom center;
  animation-name: ${shakeAnimation};
  animation-duration: 8s;
  animation-iteration-count: infinite;
`

export const Palms = () => <StyledImg src={palms} />

export default Palms
