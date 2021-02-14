import React from 'react'
import styled from 'styled-components'
import animationConfig from '~/animations'
import { range } from '~/util/range'
import DebugLabel from '~/elements/DebugLabel'
import { projectPosition } from '~/util/projections'
import { Vec3D, Vector3D, Vector2D } from '~/util/vector'

const FLOOR_TILE_SIZE = 40

const FLOOR_TILE_SIZE_X = FLOOR_TILE_SIZE * 1.6
const FLOOR_TILE_SIZE_Z = FLOOR_TILE_SIZE * 1

const FLOOR_POSITION_Y = 0

type AnimationProps = {
  delay: number
  isEnabled: boolean
}

const SCENE: Scene = {
  eye: Vec3D(0, -FLOOR_TILE_SIZE * 4, FLOOR_TILE_SIZE * 5),
  origin: Vec3D(0, -190, 0)
}

type GridProps = {
  rangeX: [number, number]
  rangeY: [number, number]
  isDebug: boolean
}

const FloorSquare = styled.path`
  fill: none;
  stroke: white;
  stroke-width: 0.1;
  ${(props: AnimationProps) =>
    props.isEnabled ? animationConfig.squaresHighlight : undefined}
  animation-delay: ${(props: AnimationProps) => props.delay}s;
`

type SquareProps = {
  x: number
  y: number
  delay: number
  isEnabled: boolean
  isDebug: boolean
  scene: Scene
}

const rectanglePathPoints = (position: Vector3D) => {
  const zHalf = FLOOR_TILE_SIZE_Z * 0.5
  const xHalf = FLOOR_TILE_SIZE_X * 0.5

  const pathPoints = [
    Vec3D(-xHalf, 0, -zHalf),
    Vec3D(+xHalf, 0, -zHalf),
    Vec3D(+xHalf, 0, +zHalf),
    Vec3D(-xHalf, 0, +zHalf)
  ].map((delta) => position.add(delta))

  return pathPoints
}

const pointsToPath = (points: Array<Vector2D>): string => {
  const [origin, ...rest] = points.map((point) => point.components().join(','))

  const path = [
    `M${origin}`,
    ...[...rest, origin].map((point) => `L${point}`)
  ].join(' ')

  return path
}

const Square: React.FC<SquareProps> = (props) => {
  const {
    x,
    y,
    delay,
    isEnabled,
    isDebug,
    scene: { eye, origin }
  } = props

  const position3D = Vec3D(
    FLOOR_TILE_SIZE_X * x,
    FLOOR_POSITION_Y,
    FLOOR_TILE_SIZE_Z * y
  )

  const pathPoints = rectanglePathPoints(position3D)

  const projected = pathPoints.map((point) =>
    projectPosition(point, origin, eye)
  )

  const centerPoint = projectPosition(position3D, origin, eye)

  const path = pointsToPath(projected)
  return (
    <>
      <FloorSquare d={path} delay={3 + delay} isEnabled={isEnabled} />
      {isDebug && (
        <DebugLabel position={centerPoint} label={[x, y].join(', ')} />
      )}
    </>
  )
}

type Scene = {
  eye: Vector3D
  origin: Vector3D
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
                scene={SCENE}
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
