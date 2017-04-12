import {combineReducers} from 'redux'

const maxUndoRedo = 5
const fix = state => ({
  past: state.past.slice(-maxUndoRedo),
  present: state.present,
  future: state.future.slice(0, maxUndoRedo),
})

const undoable = reducer => {
  const initialState = {
    past: [],
    present: reducer(undefined, {}),
    future: [],
  }
  return (state = initialState, action) => {
    const {past, present, future} = state
    switch (action.type) {
      case 'UNDO':
        const previous = past[past.length - 1]
        const newPast = past.slice(0, past.length - 1)
        return fix({
          past: newPast,
          present: previous,
          future: [present, ...future],
        })
      case 'REDO':
        const next = future[0]
        const newFuture = future.slice(1)
        return fix({
          past: [...past, present],
          present: next,
          future: newFuture,
        })
      default:
        const newPresent = reducer(present, action)
        if (present === newPresent) return state
        return fix({
          past: [...past, present],
          present: newPresent,
          future: [],
        })
    }
  }
}

const PIC = 'http://i.imgur.com/bRawGXn.jpg'
const ICON = 'http://i.imgur.com/fQsiM9F.png'
const url = undoable((state = PIC, action) => {
  switch (action.type) {
    case 'RECEIVE':
      return action.url
    default:
      return state
  }
})

const isLoading = (state = false, action) => {
  switch (action.type) {
    case 'REQUEST':
      return true
    case 'RECEIVE':
      return false
    default:
      return state
  }
}

const channels = (state = null, action) => {
  switch (action.type) {
    case 'RECEIVE_CHANNELS':
      return action.payload
    case 'HIDE_CHANNELS':
      return null
    default:
      return state
  }
}

const showChannels = (state = false, action) => {
  switch (action.type) {
    case 'REQUEST_CHANNELS':
      return true
    case 'HIDE_CHANNELS':
      return false
    default:
      return state
  }
}

const histograms = (state = null, action) => {
  switch (action.type) {
    case 'RECEIVE_HISTOGRAM':
      return action.payload
    case 'HIDE_HISTOGRAM':
    case 'HIDE_CHANNELS':
      return null
    default:
      return state
  }
}

const showHistograms = (state = false, action) => {
  switch (action.type) {
    case 'REQUEST_HISTOGRAM':
      return true
    case 'HIDE_HISTOGRAM':
    case 'HIDE_CHANNELS':
      return false
    default:
      return state
  }
}

const downsamples = (state = null, action) => {
  switch (action.type) {
    case 'RECEIVE_DOWNSAMPLES':
      return action.payload
    case 'HIDE_DOWNSAMPLES':
      return null
    default:
      return state
  }
}

const showDownsamples = (state = false, action) => {
  switch (action.type) {
    case 'REQUEST_DOWNSAMPLES':
      return true
    case 'HIDE_DOWNSAMPLES':
      return false
    default:
      return state
  }
}

export default combineReducers({
  url, isLoading,
  channels, showChannels,
  histograms, showHistograms,
  downsamples, showDownsamples,
})
