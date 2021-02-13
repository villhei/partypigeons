import React from 'react'
import styled from 'styled-components'
import { range } from '~/util'

const StyledSVG = styled.svg`
  justify-self: center;
  align-self: flex-end;
  display: flex;
  height: auto;
  width: 100%;
`

const Container = styled.div`
  width: 100%;
  height: 100%;
`

const FLOOR_TILE_SIZE = 32

const FLOOR_TILE_SIZE_X = FLOOR_TILE_SIZE * 0.5
const FLOOR_TILE_SIZE_Z = FLOOR_TILE_SIZE * 1.5

const DISTANCE = FLOOR_TILE_SIZE * 7

function calculatePosition(x: number, y: number, z: number): Pair {
  return [x * (DISTANCE / (z + DISTANCE)), y * (DISTANCE / (z + DISTANCE))]
}

type SquareProps = {
  x: number
  y: number
}

const Y_POSITION = DISTANCE * 0.07

type Pair = [number, number]

const FloorSquare = styled.path`
  fill: none;
  stroke: white;
  stroke-width: 0.1;
`

const subtract = ([la, lb]: Pair, [ra, rb]: Pair): Pair => [la - ra, lb - rb]

const Square: React.FC<SquareProps> = (props) => {
  const { x, y } = props
  const xx = FLOOR_TILE_SIZE_X * x
  const zz = FLOOR_TILE_SIZE_Z * y
  const zHalf = FLOOR_TILE_SIZE_Z * 0.5
  const xHalf = FLOOR_TILE_SIZE_X * 0.5
  const points = [
    [xx - xHalf, Y_POSITION, zz - zHalf],
    [xx + xHalf, Y_POSITION, zz - zHalf],
    [xx + xHalf, Y_POSITION, zz + zHalf],
    [xx - xHalf, Y_POSITION, zz + zHalf]
  ]

  const projected = points.map(([x, y, z]) => calculatePosition(x, y, z))

  const [a, b, c, d] = projected

  const bottomLeft = a
  const bottomRight = subtract(b, bottomLeft)
  const topRight = subtract(c, b)
  const topLeft = subtract(d, c)
  const origin = subtract(a, d)
  const path = [
    `M${bottomLeft.join(',')}`,
    `l${bottomRight.join(',')}`,
    `l${topRight.join(',')}`,
    `l${topLeft.join(',')}`,
    `l${origin.join(',')}`
  ].join(' ')

  return <FloorSquare d={path} />
}

export const FloorGrid = () => {
  const columns = range(-18, 18)
  const rows = range(-4, 5)
  return (
    <Container>
      <StyledSVG viewBox="-160 -90 320 180">
        <g>
          {rows.map((row) => (
            <g key={row}>
              {columns.map((column) => (
                <Square key={column} x={column} y={row} />
              ))}
            </g>
          ))}
        </g>
      </StyledSVG>
    </Container>
  )
}

export default FloorGrid
