import React from 'react'
import styled, { keyframes } from 'styled-components'
import pigeons from './pigeons.svg'

const fadeIn = keyframes`
    0% { opacity: 0; }
    100% { opacity: 1; }
`

const StyledImg = styled.img`
  align-self: center;
  height: 65%;
  width: 100%;
  margin-bottom: -5%;

  opacity: 0;

  animation-name: ${fadeIn};
  animation-fill-mode: forwards;
  animation-duration: 1s;
  animation-delay: 2s;
  animation-iteration-count: 1;
`

export const Pigeons = () => <StyledImg src={pigeons} />

export default Pigeons
