import React from 'react'
import styled from 'styled-components'
import { Vector2D } from '~/util/vector'

type Props = {
  position: Vector2D
  label: string
}

const Label = styled.text`
  text-anchor: middle;
  font-size: 5;
  fill: white;
`

const CenterMarker = styled.circle`
  fill: white;
  r: 1;
  opacity: 0.5;
`

const LABEL_OFFSET = -5

const DebugLabel: React.FC<Props> = (props) => {
  const {
    position: { x, y },
    label
  } = props
  return (
    <>
      <CenterMarker cx={x} cy={y} />
      <Label x={x} y={y + LABEL_OFFSET}>
        {label}
      </Label>
    </>
  )
}

export default DebugLabel
