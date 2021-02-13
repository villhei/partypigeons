import React from 'react'
import styled from 'styled-components'
import sun from './sun.svg'

const StyledImg = styled.img`
  align-self: center;
  height: 65%;
  width: 100%;
`

export const Sun = () => <StyledImg src={sun} />

export default Sun
