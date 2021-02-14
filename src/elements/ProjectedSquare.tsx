import React from 'react'
import styled from 'styled-components'
import { Vec3D, Vector3D, Vector2D } from '~/util/vector'
import animationConfig from '~/animations'
import DebugLabel from '~/elements/DebugLabel'
import { projectPosition, Scene } from '~/util/projections'

type AnimationProps = {
  delay: number
  isEnabled?: boolean
}

const FloorSquare = styled.path`
  fill: none;
  stroke: white;
  stroke-width: 0.1;
  ${(props: AnimationProps) =>
    props.isEnabled ? animationConfig.squaresHighlight : undefined}
  animation-delay: ${(props: AnimationProps) => props.delay + 2}s;
`

const rectanglePathPoints = (
  position: Vector3D,
  tileSizeX: number,
  tileSizeY: number
) => {
  const zHalf = tileSizeY * 0.5
  const xHalf = tileSizeX * 0.5

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

type ProjectedSquareProps = {
  x: number
  y: number
  delay: number
  isEnabled?: boolean
  isDebug: boolean
  scene: Scene
  tileSize: number
}

const ProjectedSquare: React.FC<ProjectedSquareProps> = (props) => {
  const {
    x,
    y,
    delay,
    isEnabled,
    isDebug,
    tileSize,
    scene: { eye, origin }
  } = props

  const tileSizeX = tileSize * 1.6
  const tileSizeZ = tileSize

  const positionY = 0

  const position3D = Vec3D(tileSizeX * x, positionY, tileSizeZ * y)

  const pathPoints = rectanglePathPoints(position3D, tileSizeX, tileSizeZ)

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

export default ProjectedSquare
