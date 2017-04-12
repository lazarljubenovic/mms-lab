import {splitToEqualParts, getProbabilities} from './util'

const shannonFano = array => {
  const arrs = splitToEqualParts(array)
  if (arrs === null) {
    return array
  } else {
    arrs[0].forEach(el => el.sequence = el.sequence + '0')
    arrs[1].forEach(el => el.sequence = el.sequence + '1')
    const first = shannonFano(arrs[0])
    const second = shannonFano(arrs[1])
    return [...first, ...second]
  }
}

export default shannonFano
