import React from 'react'
import styled from 'styled-components'
import animationConfig from '~/animations'
import pigeons from './pigeons.svg'

const StyledImg = styled.img`
  align-self: center;
  height: 65%;
  width: 100%;
  margin-bottom: -5%;
  ${animationConfig.pigeons}
`

export const Pigeons = () => <StyledImg src={pigeons} />

export default Pigeons
