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

function makewiggleMove(
  transformOrigin: string,
  rotation: number,
  movementDistance: number
) {
  return keyframes`
    0% { 
      transform-origin: ${transformOrigin}; 
      transform: translate(0) rotate(0)
    } 
    25% { 
      transform-origin: ${transformOrigin}; 
      transform: translate(${movementDistance}%) rotate(${rotation}deg)} 
    75% { 
      transform-origin:${transformOrigin}; 
      transform: translate(${movementDistance * -1}%) rotate(${
    rotation * -1
  }deg)} 
    100% {
      transform-origin: ${transformOrigin};  
      transform: translate(0) rotate(0)
      } 
`
}
const wiggleMove1 = makewiggleMove('top center', 15, 10)

const wiggleMove2 = makewiggleMove('top center', -15, -10)

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
  pigeon1: css`
    opacity: 0;
    animation-name: ${fadeIn}, ${wiggleMove1};
    animation-fill-mode: forwards, forwards;
    animation-duration: 1s, 1.5s;
    animation-delay: 3s, 5s;
    animation-iteration-count: 1, infinite;
    animation-timing-function: ease-in, linear;
  `,
  pigeon2: css`
    opacity: 0;
    animation-name: ${fadeIn}, ${wiggleMove2};
    animation-fill-mode: forwards, forwards;
    animation-duration: 1s, 2s;
    animation-delay: 3s, 5s;
    animation-iteration-count: 1, infinite;
    animation-timing-function: ease-in, linear;
  `,
  squaresHighlight: css`
    animation-name: ${pulse};
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-out;
  `
} as const

export default animationConfig
