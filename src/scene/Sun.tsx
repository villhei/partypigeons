import React from 'react'
import styled from 'styled-components'
import animationConfig from '~/animations'
import sun from './sun.svg'

const StyledImg = styled.img`
  align-self: center;
  height: 65%;
  width: 100%;
  margin-bottom: -50%;
  ${animationConfig.sun}
`

export const Sun = () => <StyledImg src={sun} />

export default Sun
