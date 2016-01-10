import React from 'react'
import ReactDOM from 'react-dom'

import 'styles/global.scss'
import styles from 'app.scss'

ReactDOM.render(
  <div className={styles['body-wrapper']}>
    <h1>Hello world</h1>
  </div>,
  document.getElementById('root')
)
