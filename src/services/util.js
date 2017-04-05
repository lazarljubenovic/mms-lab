const Jimp = window.Jimp

const ensureBetween = (a, b, x) => Math.min(Math.max(a, x), b)
export const ensureValidChannel = ensureBetween.bind(this, 0, 255)

const matrixTransform = (matrix, vector) => {
  const dim = vector.length
  let result = []
  for (let i = 0; i < dim; i++) {
    let partialSum = 0
    for (let j = 0; j < dim; j++) {
      partialSum += matrix[i][j] * vector[j]
    }
    result[i] = partialSum
  }
  return result
}

const CIE_TO_RGB_MATRIX = [
  [3.240479, -1.537150, -0.498535],
  [-0.969256, 1.875992, 0.041556],
  [0.055648, -0.204043, 1.057311],
]

const RGB_TO_CIE_MATRIX = [
  [0.412453, 0.357580, 0.180423],
  [0.212671, 0.715160, 0.072169],
  [0.019334, 0.119193, 0.950227],
]

export const cieToRgb = cieVector =>
  matrixTransform(CIE_TO_RGB_MATRIX, cieVector).map(ensureValidChannel)

export const rgbToCie = rgbVector =>
  matrixTransform(RGB_TO_CIE_MATRIX, rgbVector.map(x => x / 255))
    .map(x => x / 0.17697)

function promisify(fn, ...params) {
  return new Promise((resolve, reject) => {
    fn(...params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

const getBase64Callback = (image, cb) => image.getBase64(Jimp.MIME_JPEG, cb)
const getBase64 = (...params) => promisify(getBase64Callback, ...params)

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
