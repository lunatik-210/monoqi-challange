import React from 'react'

import styles from 'components/navbar/navbar.scss'

export default class Navbar extends React.Component {
  render() {
    return (
      <div className={styles['b-navbar']}>
        <div className={styles['b-brand-search-panel']}>
          <button className={styles['e-search-button']}>BRAND \/</button>
          <div className={styles['b-search-pop-up']}>
            <div className={styles['b-search-pop-up-content']}>
              <input className={styles['e-search-input']} type="text"/>
              <span>CURRENTLY SELECTED</span>
              <span>__________________</span>
              <span>BRANDS MATCHING YOUR SEARCH</span>
              <span>__________________</span>
              <button>APPLY SELECTION</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
