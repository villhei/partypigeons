import React from 'react'
import styled from 'styled-components'
import animationConfig from '~/animations'
import { range } from '~/util'

const StyledSVG = styled.svg`
  justify-self: center;
  align-self: flex-end;
  display: flex;
  height: 46%;
  width: 100%;
`

const FLOOR_TILE_SIZE = 40

const FLOOR_TILE_SIZE_X = FLOOR_TILE_SIZE * 1.6
const FLOOR_TILE_SIZE_Z = FLOOR_TILE_SIZE * 1

const FLOOR_POSITION_Y = 0

const EYE_POSITION = [0, -FLOOR_TILE_SIZE * 4, FLOOR_TILE_SIZE * 5]

const ORIGIN_3D = [0, -190, 0]

function calculatePosition(x: number, y: number, z: number): Pair {
  return [
    ORIGIN_3D[0] +
      (x - EYE_POSITION[0]) * (EYE_POSITION[2] / (z + EYE_POSITION[2])),
    ORIGIN_3D[1] +
      (y - EYE_POSITION[1]) * (EYE_POSITION[2] / (z + EYE_POSITION[2]))
  ]
}

type SquareProps = {
  x: number
  y: number
  delay: number
  isEnabled: boolean
  isDebug: boolean
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
  const { x, y, delay, isEnabled, isDebug } = props
  const xx = FLOOR_TILE_SIZE_X * x
  const zz = FLOOR_TILE_SIZE_Z * y
  const yy = FLOOR_POSITION_Y
  const zHalf = FLOOR_TILE_SIZE_Z * 0.5
  const xHalf = FLOOR_TILE_SIZE_X * 0.5
  const points = [
    [xx - xHalf, yy, zz - zHalf],
    [xx + xHalf, yy, zz - zHalf],
    [xx + xHalf, yy, zz + zHalf],
    [xx - xHalf, yy, zz + zHalf]
  ]

  const projected = points.map(([x, y, z]) => calculatePosition(x, y, z))

  const textOrigin = calculatePosition(xx, yy, zz)

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
  return (
    <>
      <FloorSquare d={path} delay={3 + delay} isEnabled={isEnabled} />
      {isDebug && (
        <>
          <circle
            cx={textOrigin[0]}
            cy={textOrigin[1]}
            fill="white"
            r={1}
            opacity={0.5}
          />
          <text
            x={textOrigin[0]}
            y={textOrigin[1] - 5}
            textAnchor="middle"
            font-size="4"
            style={{
              fill: 'white'
            }}
          >
            {[x, y].join(', ')}
          </text>
        </>
      )}
    </>
  )
}

const FLOOR_DEPTH = 2
const FLOOR_WIDTH = 8

export const FloorGrid = () => {
  const columns = range(-FLOOR_WIDTH, FLOOR_WIDTH)
  const rows = range(-FLOOR_DEPTH, FLOOR_DEPTH + 2)
  return (
    <StyledSVG viewBox="-160 -90 320 180">
      <g>
        {rows.map((row, j) => (
          <g key={row}>
            {columns.map((column, i) => (
              <Square
                key={column}
                x={column}
                y={row}
                isEnabled={(column * row) % 4 === 0}
                isDebug={false}
                delay={Math.abs(row * column) * 0.7}
              />
            ))}
          </g>
        ))}
      </g>
    </StyledSVG>
  )
}

export default FloorGrid
