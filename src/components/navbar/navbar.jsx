import React from 'react'

import styles from 'components/navbar/navbar.scss'

export default class Navbar extends React.Component {
  render() {
    return (
      <div className={styles['b-navbar']}>
        <span>Header</span>
      </div>
    );
  }
}
