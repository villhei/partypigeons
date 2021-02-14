import { css, keyframes } from 'styled-components'

const fadeIn = keyframes`
    0% { opacity: 0; }
    100% { opacity: 1; }
`

const slideIn = keyframes`
    0% { margin-bottom: -50%; }
    100% { margin-bottom: 0; }
`

const windShake = keyframes`
    0% { transform: skewX(0deg); }
    10% { transform: skewX(10deg);}
    75% { transform: skewX(-5deg) }
    100% { transform: skewX(0deg); }
`

const pulse = keyframes`
    0% { fill: rgba(255,255,255,0.2) }
    50% {fill: rgba(255,255,255,0) }
    100% { fill: rgba(255,255,255,0.2) }
`
const SCENE_START_DELAY = '3s'

const animationConfig = {
  rootElement: css`
    animation-name: ${fadeIn};
    animation-duration: ${SCENE_START_DELAY};
    animation-iteration-count: 1;
  `,
  sun: css`
    animation-name: ${slideIn};
    animation-delay: ${SCENE_START_DELAY}, 5;
    animation-duration: 4s, 4s;
    animation-iteration-count: 1, infinite;
    animation-fill-mode: forwards, none;
    animation-timing-function: ease-out, linear;
  `,
  palms: css`
    transform-origin: bottom center;
    animation-name: ${windShake};
    animation-duration: 8s;
    animation-iteration-count: infinite;
  `,
  pigeons: css`
    opacity: 0;
    animation-name: ${fadeIn};
    animation-fill-mode: forwards;
    animation-duration: 1s;
    animation-delay: 2s;
    animation-iteration-count: 1;
  `,
  squaresHighlight: css`
    animation-name: ${pulse};
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-out;
  `
} as const

export default animationConfig
