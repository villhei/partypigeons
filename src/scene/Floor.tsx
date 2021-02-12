import React from 'react'
import styled from 'styled-components'
import floor from './floor.svg'

const StyledImg = styled.img`
    justify-self: center;
    display: flex;
    height: auto;
    width: 100%;
`


export const Floor = () => <StyledImg src={floor} />


export default Floor