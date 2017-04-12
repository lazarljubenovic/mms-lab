import {splitToEqualParts, getProbabilities} from '../src/services/shannon-fano/util'

const spawnSingle = probability => ({probability, name: 'x', sequence: ''})
const spawn = arr => arr.map(spawnSingle)

const PIC = 'http://i.imgur.com/bRawGXn.jpg'
const ICON = 'http://i.imgur.com/fQsiM9F.png'

describe(`Shannon Fano Utils`, () => {

  xdescribe(`getProbabilities`, () => {

    it(`should work for icon`, done => {
      const probs = getProbabilities(ICON)
      expect(probs).toEqual([])
    })

  })

  describe(`splitToEqualParts`, () => {

    it(`should work for array of a single item`, () => {
      expect(splitToEqualParts([{a: 1}], x => x.a)).toEqual(null)
    })

    it(`should work even when it's crazy`, () => {
      expect(splitToEqualParts([{a: 100, b: 'b'}, {a: 1, b: 'b'}], x => x.a))
        .toEqual([[{a: 100, b: 'b'}], [{a: 1, b: 'b'}]])
    })

    it(`should work even when it's crazy 2`, () => {
      expect(splitToEqualParts([100, 100], x => x)).toEqual([[100], [100]])
    })

    it(`should generally work`, () => {
      const arr = [6.5, 6.5, 3, 3, 1] // sum = 20
      expect(splitToEqualParts(arr, x => x)).toEqual([[6.5, 6.5], [3, 3, 1]])
    })

    it(`should work when all 4 elements are equal`, () => {
      const arr = [.25, .25, .25, .25].map(spawnSingle)
      expect(splitToEqualParts(arr, x => x.probability))
        .toEqual([[.25, .25], [.25, .25]]
          .map(arr => arr.map(probability => ({name: 'x', probability, sequence: ''}))))
    })

    it(`should generally work: mode hard`, () => {
      const arr = [.3, .2, .1, .09, .09, .09, .09, .04]
      expect(splitToEqualParts(arr, x => x)).toEqual([
        [.3, .2],
        [.1, .09, .09, .09, .09, .04],
      ])

      expect(splitToEqualParts([.3, .2], x => x)).toEqual([[.3], [.2]])
      expect(splitToEqualParts([.1, .09, .09, .09, .09, .04], x => x))
        .toEqual([
          [.1, .09, .09],
          [.09, .09, .04],
        ])
      expect(splitToEqualParts([.1, .09, .09], x => x))
        .toEqual([
          [.1],
          [.09, .09]
        ])
    })

  })

})

import shannonFano from '../src/services/shannon-fano'

describe(`Shannon Fano`, () => {


  it(`should work for two elements`, () => {
    const arr = spawn([.8, .2])
    expect(shannonFano(arr)).toEqual([
      {name: 'x', sequence: '0', probability: .8},
      {name: 'x', sequence: '1', probability: .2},
    ])
  })

  it(`should work for three elements`, () => {
    const arr = spawn([.5, .4, .1])
    expect(shannonFano(arr)).toEqual([
      {name: 'x', sequence: '0', probability: .5},
      {name: 'x', sequence: '10', probability: .4},
      {name: 'x', sequence: '11', probability: .1},
    ])
  })

  it(`should work for 4 elemets`, () => {
    const arr = spawn([.25, .25, .25, .25])
    expect(shannonFano(arr)).toEqual([
      {name: 'x', probability: .25, sequence: '00'},
      {name: 'x', probability: .25, sequence: '01'},
      {name: 'x', probability: .25, sequence: '10'},
      {name: 'x', probability: .25, sequence: '11'},
    ])
  })

  it(`should work`, () => {
    const arr = spawn([.3, .2, .1, .09, .09, .09, .09, .04])
    expect(shannonFano(arr).map(x => x.sequence)).toEqual([
      '00', '01', '100', '1010', '1011', '110', '1110', '1111',
    ])
  })

})
