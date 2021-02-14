import React from 'react'
import styled from 'styled-components'
import animationConfig from '~/animations'
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

const FLOOR_TILE_SIZE_X = FLOOR_TILE_SIZE * 1
const FLOOR_TILE_SIZE_Z = FLOOR_TILE_SIZE * 1.2

const Y_POSITION = 43

const DISTANCE = Y_POSITION * 5

function calculatePosition(x: number, y: number, z: number): Pair {
  return [x * (DISTANCE / (z + DISTANCE)), y * (DISTANCE / (z + DISTANCE))]
}

type SquareProps = {
  x: number
  y: number
  delay: number
  isEnabled: boolean
}

type Pair = [number, number]

type AnimationProps = {
  delay: number
  isEnabled: boolean
}
const FloorSquare = styled.path`
  fill: none;
  stroke: white;
  stroke-width: 0.1;
  ${(props: AnimationProps) =>
    props.isEnabled ? animationConfig.squaresHighlight : undefined}
  animation-delay: ${(props: AnimationProps) => props.delay}s;
`

const subtract = ([leftA, leftB]: Pair, [rightA, rightB]: Pair): Pair => [
  leftA - rightA,
  leftB - rightB
]

const Square: React.FC<SquareProps> = (props) => {
  const { x, y, delay, isEnabled } = props
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
  return <FloorSquare d={path} delay={3 + delay} isEnabled={isEnabled} />
}

export const FloorGrid = () => {
  const columns = range(-18, 18)
  const rows = range(-5, 8)
  return (
    <Container>
      <StyledSVG viewBox="-160 -90 320 180">
        <g transform="translate(0, -11)">
          {rows.map((row, j) => (
            <g key={row}>
              {columns.map((column, i) => (
                <Square
                  key={column}
                  x={column}
                  y={row}
                  isEnabled={(column * row) % 4 === 0}
                  delay={Math.abs(row * column) * 0.7}
                />
              ))}
            </g>
          ))}
        </g>
      </StyledSVG>
    </Container>
  )
}

export default FloorGrid
