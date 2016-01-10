import React from 'react'

import Navbar from 'components/navbar/navbar'
import Content from 'components/content/content'

import styles from 'components/root.scss'

export default class Root extends React.Component {
  render() {
    return (
      <div className={styles['b-root']}>
        <Navbar />
        <Content />
      </div>
    );
  }
}
