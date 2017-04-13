import {sort, splitToEqualParts, getProbabilities} from './util'

const _shannonFano = array => {
  const arrs = splitToEqualParts(array)
  if (arrs === null) {
    return array
  } else {
    arrs[0].forEach(el => el.sequence = el.sequence + '0')
    arrs[1].forEach(el => el.sequence = el.sequence + '1')
    const first = _shannonFano(arrs[0])
    const second = _shannonFano(arrs[1])
    return [...first, ...second]
  }
}

const shannonFano = array => {
  array = sort(array)
  return _shannonFano(array)
}

export default shannonFano
