import { applyMiddleware, compose, createStore } from 'redux'
import logger from 'redux-logger'

import reducer from 'redux/reducers'

export default function configureStore (initialState) {
  return compose(applyMiddleware(logger())(createStore)(reducer, initialState)
}
