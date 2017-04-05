import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import {reducer as form} from 'redux-form'
import image from './reducers'

export default createStore(
  combineReducers({image, form}),
  applyMiddleware(thunk, logger))