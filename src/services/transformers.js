import {transform, extract, rgbToCie, cieToRgb,
  ensureValidChannel, expandMatrix} from './util'

export const invert = url => transform(url, image => image.invert())

export const color = (url, {r, g, b}) => transform(url, image => {
  r = +r ; g = +g ; b = +b
  if (typeof r !== 'number' || typeof g !== 'number' || typeof b !== 'number')
    throw new Error(`RGB must be numbers, given: ${r}, ${g}, ${b}`)
  const {width: w, height: h} = image.bitmap
  return image.scan(0, 0, w, h, (x, y, i) => {
    image.bitmap.data[i] = ensureValidChannel(r + image.bitmap.data[i])
    image.bitmap.data[i + 1] = ensureValidChannel(g + image.bitmap.data[i + 1])
    image.bitmap.data[i + 2] = ensureValidChannel(b + image.bitmap.data[i + 2])
  })
})

const convolutionMatrix = [[-1, 1, -1], [-1, 9, -1], [-1, -1, -1]]
export const meanRemoval = (url, {size}) =>
  transform(url, image =>
    image.convolution(expandMatrix(convolutionMatrix, size)))

const rgbChannel = (url, rgbIndex) => transform(url, image => {
  const {width: w, height: h} = image.bitmap
  return image.scan(0, 0, w, h, (x, y, i) => {
    if (rgbIndex !== 0) image.bitmap.data[i] = 0
    if (rgbIndex !== 1) image.bitmap.data[i + 1] = 0
    if (rgbIndex !== 2) image.bitmap.data[i + 2] = 0
  })
})

export const rgbChannels = url =>
  Promise.all([rgbChannel(url, 0), rgbChannel(url, 1), rgbChannel(url, 2)])

export const histogram = (url, rgbIndex) => extract(url, image => {
  const {width: w, height: h} = image.bitmap
  const data = new Array(256).fill(0)
  image.scan(0, 0, w, h, (x, y, i) => {
    data[image.bitmap.data[i + rgbIndex]]++
  })
  return {
    from: 0,
    to: 255,
    data,
  }
})

export const histograms = url => Promise.all([
  histogram(url, 0), histogram(url, 1), histogram(url, 2),
])

const rgbaToArr = ({r, g, b, a}) => [r, g, b, a]
export const edgeDetectHomogenity = url => transform(url, image => {
  const {width: w, height: h} = image.bitmap
  const newImage = image.clone()
  return newImage.scan(1, 1, w - 2, h - 2, (x, y, j) => {
    for (let i = 0; i < 3; i++) {
      newImage.bitmap.data[j + i] = Math.max(...[
        image.getPixelColor(x - 1, y - 1),
        image.getPixelColor(x - 1, y),
        image.getPixelColor(x - 1, y + 1),
        image.getPixelColor(x, y - 1),
        image.getPixelColor(x, y + 1),
        image.getPixelColor(x + 1, y - 1),
        image.getPixelColor(x + 1, y),
        image.getPixelColor(x + 1, y + 1),
      ].map(pixel => rgbaToArr(window.Jimp.intToRGBA(pixel))[i])
       .map(pixel => Math.abs(pixel - image.bitmap.data[j + i])))
    }
  })
})

export const timeWrap = (url, {factor = 15}) => transform(url, image => {
  const {width: w, height: h} = image.bitmap
  const [midX, midY] = [w / 2, h / 2]
  let theta, radius, newX, newY
  return image.scan(0, 0, w, h, (x, y, i) => {
    for (let j = 0; j < 3; j++) {
      let trueX = x - midX
      let trueY = y - midY
      theta = Math.atan2(trueY, trueX)
      radius = Math.hypot(trueX, trueY)
      const newRadius = Math.sqrt(radius) * factor

      newX = midX + (newRadius * Math.cos(theta))
      if (newX > 0 && newX < w) {
        image.bitmap.data[i + j] = newX
      } else {
        image.bitmap.data[i + j] = 0
      }
      newY = midY + (newRadius * Math.sin(theta))
      if (newY > 0 && newY < h) {
        image.bitmap.data[i + j] = newY
      } else {
        image.bitmap.data[i + j] = 0
      }
    }
  })
})

const generateChunkMap = (total, k) => {
  k = +k
  const arr = []
  let z = 0
  for (let i = 0; i <= Math.ceil(total / k); i++) {
    const start = i * k
    const end = i * k + k - 1
    const avg = Math.round((start + end) / 2)
    for (let j = 0; j <= k; j++) {
      arr[z++] = avg
    }
  }
  const res = arr.slice(0, 256)
  return res
}
const generateRgbChunkMap = generateChunkMap.bind(null, 255)

export const averageChunks = (url, {k = 3}) => transform(url, image => {
  const chunkMap = generateRgbChunkMap(k)
  const {width: w, height: h} = image.bitmap
  return image.scan(0, 0, w, h, (x, y, i) => {
    for (let j = i; j < i + 3; j++) {
      image.bitmap.data[j] = chunkMap[image.bitmap.data[j]]
    }
  })
})
