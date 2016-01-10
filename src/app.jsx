import React from 'react'
import ReactDOM from 'react-dom'

import Root from 'components/root'

import 'styles/global.scss'
import styles from 'app.scss'

ReactDOM.render(
  <div className={styles['body-wrapper']}>
    <Root />
  </div>,
  document.getElementById('root')
)
