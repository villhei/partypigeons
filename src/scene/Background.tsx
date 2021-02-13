import styled from 'styled-components'

const backgroundGradients = `
linear-gradient(0deg,
 rgb(235, 30, 121) 13.41%,
 rgb(225, 30, 118) 14.46%,
 rgb(178, 29, 102) 20.07%,
 rgb(136, 28, 88) 26.179999999999996%,
 rgb(99, 28, 75) 32.65%,
 rgb(68, 27, 65) 39.589999999999996%,
 rgb(43, 27, 57) 47.13%,
 rgb(24, 26, 50) 55.510000000000005%,
 rgb(10, 26, 45) 65.2%,
 rgb(2, 26, 43) 77.38000000000001%,
 rgb(0, 26, 42) 100%),
linear-gradient(0, 
 rgb(0, 20, 42) 0%,
 rgb(27, 20, 66) 8.86%,
 rgb(69, 19, 101) 24.03%,
 rgb(98, 19, 127) 37.830000000000005%,
 rgb(117, 19, 142) 49.65%,
 rgb(123, 19, 148) 58.099999999999994%,
 rgb(255, 42, 232) 100%)
`

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: ${backgroundGradients};
  background-repeat: no-repeat, no-repeat;
  background-position: 0% 0%, 54% 100%;
  background-size: 100% 54%, 100% 46%;
  position: relative;
`

export default Background
