import React from 'react'
import styled from 'styled-components'
import animationConfig from '~/animations'
import palms from './palms.svg'

const StyledImg = styled.img`
  align-self: center;
  height: 65%;
  width: 100%;
  margin-top: -15%;
  ${animationConfig.palms}
`

export const Palms = () => <StyledImg src={palms} />

export default Palms
