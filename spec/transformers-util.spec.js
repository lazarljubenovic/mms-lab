import {setChannel} from '../src/services/util'

describe(`Transformer utils`, () => {

  describe(`setChannel`, () => {

    it(`should set red channel`, () => {
      const pixel = 0xAABBCCDD
      const index = 0
      const value = 0x66
      expect(setChannel(pixel, index, value)).toBe(0x66BBCCDD)
    })

    it(`should set green channel`, () => {
      const pixel = 0x00112233
      const index = 1
      const value = 0xFF
      expect(setChannel(pixel, index, value)).toBe(0x00FF2233)
    })

    it(`should set blue channel`, () => {
      const pixel = 0x00112233
      const index = 2
      const value = 0xFF
      expect(setChannel(pixel, index, value)).toBe(0x0011FF33)
    })

    it(`should work`, () => {
      const pixel = 0x6ebfeaff
      const value = 0x8b
      const index = 0
      expect(setChannel(pixel, index, value)).toBe(0x8bbfeaff)
    })

  })

})
