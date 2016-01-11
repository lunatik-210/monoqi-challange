import React from 'react'

import styles from 'components/navbar/navbar.scss'

export default class Navbar extends React.Component {
  constructor (props) {
    super(props)

    this.onQueryChange = this.onQueryChange.bind(this)
  }

  render () {
    return (
      <div className={styles['b-navbar']}>
        <div className={styles['b-brand-search-panel']}>
          <button className={styles['e-search-button']}>BRAND \/</button>
          <div className={styles['b-search-pop-up']}>
            <div className={styles['b-search-pop-up-content']}>
              <input className={styles['e-search-input']} value={this.props.searchProperties.query} onChange={this.onQueryChange} type="text"/>
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

  onQueryChange (e) {
    this.props.actions.changeSearchQuery(e.target.value)
  }
}
