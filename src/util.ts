export const range = (from: number, to: number): number[] => {
  const n = Math.abs(to - from + 1)

  return Array.apply(null, Array(n)).map(function (_, i) {
    return from + i
  })
}
