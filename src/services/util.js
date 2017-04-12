const Jimp = window.Jimp

const ensureBetween = (a, b, x) => Math.min(Math.max(a, x), b)
export const ensureValidChannel = ensureBetween.bind(this, 0, 255)

// const matrixTransform = (matrix, vector) => {
//   const dim = vector.length
//   let result = []
//   for (let i = 0; i < dim; i++) {
//     let partialSum = 0
//     for (let j = 0; j < dim; j++) {
//       partialSum += matrix[i][j] * vector[j]
//     }
//     result[i] = partialSum
//   }
//   return result
// }

function promisify(fn, ...params) {
  return new Promise((resolve, reject) => {
    fn(...params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

const getBase64Callback = (image, cb) => image.getBase64(Jimp.MIME_JPEG, cb)
export const getBase64 = (...params) => promisify(getBase64Callback, ...params)

export const transform = (url, transformer) =>
  Jimp.read(url)
    .then(image => transformer(image))
    .then(getBase64)
    .catch(console.error.bind(console))

export const extract = (url, extractor) =>
  Jimp.read(url)
    .then(image => extractor(image))
    .catch(console.error.bind(console))

// Expects matrix of size 3x3
export const expandMatrix = (matrix, size) => {
  size = +size
  const [[a, b, c], [d, e, f], [g, h, i]] = matrix
  switch (size) {
    case 3: return matrix
    case 5: return [
      [a, a, b, b, c],
      [d, a, b, c, c],
      [d, d, e, f, f],
      [g, g, h, i, f],
      [g, h, h, i, i],
    ]
    case 7: return [
      [a, a, 0, b, b, 0, c],
      [0, a, a, b, b, c, c],
      [d, d, a, b, c, c, 0],
      [d, d, d, e, f, f, f],
      [0, g, g, h, i, f, f],
      [g, g, h, h, i, i, 0],
      [g, 0, h, h, 0, i, i],
    ]
    default: throw new Error(`Cannot expand matrix to size ${size}.`)
  }
}

export const rgbaToArr = ({r, g, b, a}) => [r, g, b, a]

export const getChannel = (pixel, i) => rgbaToArr(Jimp.intToRGBA(pixel))[i]

export const setChannel = (pixel, index, value) => {
  switch (index) {
    case 0:
      return (pixel & 0x00FFFFFF | (value << 24)) >>> 0
    case 1:
      return (pixel & 0xFF00FFFF | (value << 16)) >>> 0
    case 2:
      return (pixel & 0xFFFF00FF | (value << 8)) >>> 0
    default:
      throw new Error(`nope`)
  }
}

const getAverage = (pixels, index) => {
  let sum = 0
  for (const pixel of pixels) {
    const channel = getChannel(pixel, index)
    sum += channel
  }
  return Math.round(sum / pixels.length)
}

export const pixelAverage = (pixels, notDownsampled) => {
  const data = [pixels.map(pixel => getChannel(pixel, notDownsampled))]
  for (let i = 0; i < 3; i++) {
    if (i === notDownsampled) continue
    const avg = getAverage(pixels, i)
    data.push([avg])
  }
  return data
}
