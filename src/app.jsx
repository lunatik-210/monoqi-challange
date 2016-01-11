import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import createStore from 'redux/store'
import Root from 'components/root'

import 'styles/global.scss'

let store = createStore({})

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root')
)
