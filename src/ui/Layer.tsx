import styled, { css } from 'styled-components'

type LayerProps = {
  offsetX?: number
  offsetY?: number
}

const getOffsetX = (offset?: number) => {
  if (!offset) {
    return css`
      left: 0;
      right: 0;
    `
  }
  if (offset > 0) {
    return css`
      left: ${Math.abs(offset)}%;
      right: -${Math.abs(offset)}%;
    `
  } else {
    return css`
      left: -${Math.abs(offset)}%;
      right: ${Math.abs(offset)}%;
    `
  }
}

const getOffsetY = (offset?: number) => {
  if (!offset) {
    return css`
      top: 0;
      bottom: 0;
    `
  }
  if (offset > 0) {
    return css`
      top: ${Math.abs(offset)}%;
      bottom: -${Math.abs(offset)}%;
    `
  } else {
    return css`
      top: -${Math.abs(offset)}%;
      bottom: ${Math.abs(offset)}%;
    `
  }
}
const Layer = styled.div`
  position: absolute;
  display: flex;
  overflow: hidden;
  ${(props: LayerProps) => getOffsetY(props.offsetY)}
  ${(props: LayerProps) => getOffsetX(props.offsetX)}
`
export default Layer
