import React from 'react'
import styled from 'styled-components'
import animationConfig from '~/animations'
import Layer from '~/ui/Layer'
import pigeon from './pigeon_1.svg'
import pigeon2 from './pigeon_2.svg'

const PigeonFirst = styled.img`
  align-self: center;
  height: 55%;
  width: 100%;
  ${animationConfig.pigeon1}
`

const PigeonSecond = styled.img`
  align-self: center;
  height: 40%;
  width: 100%;
  ${animationConfig.pigeon2};
`

export const Pigeons = () => (
  <>
    <Layer>
      <PigeonFirst src={pigeon} />
    </Layer>
    <Layer offsetX={30} offsetY={5}>
      <PigeonSecond src={pigeon2} />
    </Layer>
  </>
)

export default Pigeons
