import {histograms} from '../transformers'

const sumArr = arr => arr.reduce((curr, acc) => curr + acc, 0)
const sumArrTill = (arr, i) => sumArr(arr.slice(0, i + 1))
const percentageArr = arr => {
  const sum = sumArr(arr)
  return arr.map(el => el / sum)
}

export const getProbabilities = url => histograms(url)
  .then(histograms => {
    let probs = new Array(histograms[0].length).fill(0)
    for (let i = 0; i < histograms[0].length; i++) {
      probs[i] = histograms[0][i] + histograms[1][i] + histograms[2][i]
    }
    return probs.map((probability, name) => ({name, probability, sequence: ''}))
  })

export const sort = arr => arr.sort((a, b) => a.probability < b.probability ? 1 : -1)

export const splitToEqualParts = (arr, compare = x => x.probability) => {
  if (arr.length <= 1) return null
  const sum = sumArr(arr.map(compare))
  const half = sum / 2
  let diff = Infinity
  let i = 0
  for (; i < arr.length; i++) {
    const newDiff = Math.abs(half - sumArrTill(arr.map(compare), i))
    if (newDiff < diff) {
      diff = newDiff
    } else {
      if (i != 0) break
    }
  }
  return [arr.slice(0, i), arr.slice(i)]
}
