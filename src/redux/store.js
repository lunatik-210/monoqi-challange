import { applyMiddleware, compose, createStore } from 'redux'
import logger from 'redux-logger'

import reducer from 'redux/reducers'

export default function configureStore (initialState) {
  if (__DEBUG__) {
    return compose(applyMiddleware(logger()))(createStore)(reducer, initialState)
  }
  return createStore(reducer, initialState)
}
