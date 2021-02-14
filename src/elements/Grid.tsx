import React from 'react'
import { range } from '~/util/range'
import { Scene } from '~/util/projections'
import { Vec3D } from '~/util/vector'
import ProjectedSquare from '~/elements/ProjectedSquare'

const FLOOR_TILE_SIZE = 40

const SCENE: Scene = {
  eye: Vec3D(0, -FLOOR_TILE_SIZE * 4, FLOOR_TILE_SIZE * 5),
  origin: Vec3D(0, -190, 0)
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
              <ProjectedSquare
                key={column}
                x={column}
                y={row}
                scene={SCENE}
                isEnabled={(column * row) % 4 === 0}
                isDebug={isDebug}
                delay={Math.abs(row * column) * 0.7}
                tileSize={FLOOR_TILE_SIZE}
              />
            ))}
          </g>
        ))}
      </g>
    </svg>
  )
}

export default Grid
