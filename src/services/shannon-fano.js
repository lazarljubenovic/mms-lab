const sumArr = arr => arr.reduce((curr, acc) => curr + acc)

const splitToEqualParts = arr => {
  if (arr.length === 1) return null
  const sum = sumArr(arr)
  const half = sum / 2
  let diff = Infinity
  let i = 0
  for (; i < arr.length; i++) {
    const newDiff = Math.abs(half, item)
    if (newDiff < diff) {
      diff = newDiff
    } else {
      break
    }
  }
  const separator = i
}

// .30   .30   .25   .13    .1    .1
// .30   .30 | .25   .13    .1    .1
