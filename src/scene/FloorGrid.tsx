import React from 'react'
import styled from 'styled-components'
import Grid from '~/elements/Grid'

const FLOOR_DEPTH = 2
const FLOOR_WIDTH = 8

const StyledGrid = styled(Grid)`
  justify-self: center;
  align-self: flex-end;
  display: flex;
  height: 46%;
  width: 100%;
  display: flex;
`

export const FloorGrid = () => {
  return (
    <StyledGrid
      width="100%"
      height="46%"
      rangeX={[-FLOOR_WIDTH, FLOOR_WIDTH]}
      rangeY={[-FLOOR_DEPTH, FLOOR_DEPTH + 2]}
      isDebug={false}
    />
  )
}

export default FloorGrid
