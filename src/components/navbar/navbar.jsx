import React from 'react'
import _ from 'underscore'

import styles from 'components/navbar/navbar.scss'

export default class Navbar extends React.Component {
  constructor (props) {
    super(props)

    this.onQueryChange = this.onQueryChange.bind(this)
    this.renderBrand = this.renderBrand.bind(this)
    this.renderSelectedBrands = this.renderSelectedBrands.bind(this)
    this.renderDeSelectedBrands = this.renderDeSelectedBrands.bind(this)
  }

  render () {
    const popupStyles = {
      display: this.props.searchProperties.isExpanded ? 'block' : 'none'
    }

    const indicatorStyles = {
      display: this.props.selectedBrands.length ? 'block' : 'none'
    }

    const searchButtonStyles = {
      background: this.props.searchProperties.isExpanded ? '#C2C2C2' : '#DDDDDD'
    }

    const searchStyles = {
      display: this.props.searchProperties.results.length ? 'block' : 'none'
    }

    return (
      <div className={styles['b-navbar']}>
        <div className={styles['b-brand-search-panel']}>
          <div className={styles['e-search-button']}>
            <div style={indicatorStyles} className={styles['e-search-indicator']}>{this.props.selectedBrands.length}</div>
            <button style={searchButtonStyles} onClick={this.props.actions.triggerSearchPanel}>BRAND \/</button>
          </div>
          <div style={popupStyles} className={styles['b-search-pop-up']}>
            <div className={styles['b-search-pop-up-content']}>
              <div className={styles['b-search']}>
                <div className={styles['e-search-label']}>
                  <span>SEARCH</span>
                </div>
                <input className={styles['e-search-input']} value={this.props.searchProperties.query} onChange={this.onQueryChange} type="text"/>
              </div>
              <span style={indicatorStyles}>CURRENTLY SELECTED</span>
                {_.map(this.props.selectedBrands, this.renderDeSelectedBrands)}
              <div style={indicatorStyles} className={styles['e-separator']} />
              <span style={searchStyles}>BRANDS MATCHING YOUR SEARCH</span>
                {_.map(this.props.searchProperties.results, this.renderSelectedBrands)}
              <div style={searchStyles} className={styles['e-separator']} />
              <button className={styles['e-apply-button']} onClick={this.props.actions.triggerSearchPanel}>APPLY SELECTION</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderSelectedBrands (brand) {
    return this.renderBrand(brand, true)
  }

  renderDeSelectedBrands (brand) {
    return this.renderBrand(brand, false)
  }

  renderBrand (brand, checked) {
    let triggerBrand = () => {
      let callback = checked ? this.props.actions.selectBrand : this.props.actions.deselectBrand
      callback(brand)
    }

    return (
      <div className={styles['b-search-pop-up-brand']}>
        <input checked={!checked} type="checkbox" onChange={triggerBrand} />
        <span>{brand.brand_copy[0].brand_name}</span>
      </div>
    )
  }

  onQueryChange (e) {
    this.props.actions.changeSearchQuery(e.target.value)
  }
}
