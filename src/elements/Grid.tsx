import React from 'react'
import styled from 'styled-components'
import animationConfig from '~/animations'
import { range } from '~/util/range'
import { projectPosition } from '~/util/projections'
import { Vec3D } from '~/util/vector'

const FLOOR_TILE_SIZE = 40

const FLOOR_TILE_SIZE_X = FLOOR_TILE_SIZE * 1.6
const FLOOR_TILE_SIZE_Z = FLOOR_TILE_SIZE * 1

const FLOOR_POSITION_Y = 0

const EYE_POSITION = Vec3D(0, -FLOOR_TILE_SIZE * 4, FLOOR_TILE_SIZE * 5)

const ORIGIN_3D = Vec3D(0, -190, 0)

type SquareProps = {
  x: number
  y: number
  delay: number
  isEnabled: boolean
  isDebug: boolean
}

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

const CoordinateLabel = styled.text`
  text-anchor: middle;
  font-size: 5;
  fill: white;
`

const CenterMarker = styled.circle`
  fill: white;
  r: 1;
  opacity: 0.5;
`

const Square: React.FC<SquareProps> = (props) => {
  const { x, y, delay, isEnabled, isDebug } = props
  const gridPosition = Vec3D(
    FLOOR_TILE_SIZE_X * x,
    FLOOR_POSITION_Y,
    FLOOR_TILE_SIZE_Z * y
  )
  const zHalf = FLOOR_TILE_SIZE_Z * 0.5
  const xHalf = FLOOR_TILE_SIZE_X * 0.5

  const points = [
    Vec3D(-xHalf, 0, -zHalf),
    Vec3D(+xHalf, 0, -zHalf),
    Vec3D(+xHalf, 0, +zHalf),
    Vec3D(-xHalf, 0, +zHalf)
  ].map((delta) => gridPosition.add(delta))

  const projected = points.map((point) =>
    projectPosition(point, ORIGIN_3D, EYE_POSITION)
  )

  const textOrigin = projectPosition(gridPosition, ORIGIN_3D, EYE_POSITION)

  const [a, b, c, d] = projected

  const bottomLeft = a
  const bottomRight = b.subtract(a)
  const topRight = c.subtract(b)
  const topLeft = d.subtract(c)
  const origin = a.subtract(d)

  const path = [
    `M${bottomLeft.components().join(',')}`,
    `l${bottomRight.components().join(',')}`,
    `l${topRight.components().join(',')}`,
    `l${topLeft.components().join(',')}`,
    `l${origin.components().join(',')}`
  ].join(' ')
  return (
    <>
      <FloorSquare d={path} delay={3 + delay} isEnabled={isEnabled} />
      {isDebug && (
        <>
          <CenterMarker cx={textOrigin.x} cy={textOrigin.y} />
          <CoordinateLabel x={textOrigin.x} y={textOrigin.y - 5}>
            {[x, y].join(', ')}
          </CoordinateLabel>
        </>
      )}
    </>
  )
}

type GridProps = {
  rangeX: [number, number]
  rangeY: [number, number]
  isDebug: boolean
}

const Grid: React.FC<React.SVGProps<SVGSVGElement> & GridProps> = (props) => {
  const { rangeX, rangeY, isDebug = true, ...rest } = props
  const [startX, endX] = rangeX
  const [startY, endY] = rangeY

  const columns = range(startX, endX)
  const rows = range(startY, endY)

  return (
    <svg {...rest} viewBox="-160 -90 320 180">
      <g>
        {rows.map((row, j) => (
          <g key={row}>
            {columns.map((column, i) => (
              <Square
                key={column}
                x={column}
                y={row}
                isEnabled={(column * row) % 4 === 0}
                isDebug={isDebug}
                delay={Math.abs(row * column) * 0.7}
              />
            ))}
          </g>
        ))}
      </g>
    </svg>
  )
}

export default Grid
