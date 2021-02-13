import React from 'react'
import styled from 'styled-components'
import floor from './floor.svg'

const StyledImg = styled.img`
  justify-self: center;
  align-self: flex-end;
  display: flex;
  height: auto;
  width: 100%;
  background: linear-gradient(
    0,
    rgb(0, 20, 42) 0%,
    rgb(27, 20, 66) 8.86%,
    rgb(69, 19, 101) 24.03%,
    rgb(98, 19, 127) 37.830000000000005%,
    rgb(117, 19, 142) 49.65%,
    rgb(123, 19, 148) 58.099999999999994%,
    rgb(255, 42, 232) 100%
  );
`

export const Floor = () => <StyledImg src={floor} />

export default Floor
