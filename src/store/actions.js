import * as transformer from '../services/transformers'

const selectImage = state => state.image
const selectUrl = state => selectImage(state).url.present

export const request = () => ({type: 'REQUEST'})
const _receive = url => ({type: 'RECEIVE', url})

const requestChannels = () => ({type: 'REQUEST_CHANNELS'})
const receiveChannels = payload => ({type: 'RECEIVE_CHANNELS', payload})

const requestHistogram = () => ({type: 'REQUEST_HISTOGRAM'})
const receiveHistogram = payload => ({type: 'RECEIVE_HISTOGRAM', payload})

const updateChannelsAndHistograms = (url) => (dispatch, getState) => {
  const {showChannels: c, showHistograms: h} = selectImage(getState())
  if (c) transformer.rgbChannels(url).then(x => dispatch(receiveChannels(x)))
  if (h) transformer.histograms(url).then(x => dispatch(receiveHistogram(x)))
}

export const receive = (url) => dispatch => {
  dispatch(_receive(url))
  dispatch(updateChannelsAndHistograms(url))
}

const transform = (options, transformer) => (dispatch, getState) => {
  const url = selectUrl(getState())
  dispatch(request())
  transformer(url, options).then(x => dispatch(receive(x)))
}
const bindTransform = transformer => options => transform(options, transformer)
export const invert = bindTransform(transformer.invert)
export const color = bindTransform(transformer.color)
export const meanRemoval = bindTransform(transformer.meanRemoval)
export const edgeDetectHomogenity = bindTransform(transformer.edgeDetectHomogenity)
export const timeWrap = bindTransform(transformer.timeWrap)

export const undo = () => (dispatch, getState) => {
  dispatch({type: 'UNDO'})
  dispatch(updateChannelsAndHistograms(selectUrl(getState())))
}

export const redo = () => (dispatch, getState) => {
  dispatch({type: 'REDO'})
  dispatch(updateChannelsAndHistograms(selectUrl(getState())))
}

export const showChannels = (fn = transformer.rgbChannels) => (dispatch, getState) => {
  dispatch(requestChannels())
  const url = selectUrl(getState())
  fn(url).then(x => dispatch(receiveChannels(x)))
}

export const showHistograms = () => (dispatch, getState) => {
  dispatch(requestHistogram())
  const url = selectUrl(getState())
  transformer.histograms(url).then(x => dispatch(receiveHistogram(x)))
}

export const hideChannels = () => ({type: 'HIDE_CHANNELS' })
export const hideHistograms = () => ({type: 'HIDE_HISTOGRAM'})
