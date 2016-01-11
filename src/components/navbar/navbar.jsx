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

    return (
      <div className={styles['b-navbar']}>
        <div className={styles['b-brand-search-panel']}>
          <button onClick={this.props.actions.triggerSearchPanel} className={styles['e-search-button']}>BRAND \/</button>
          <div style={popupStyles} className={styles['b-search-pop-up']}>
            <div className={styles['b-search-pop-up-content']}>
              <input className={styles['e-search-input']} value={this.props.searchProperties.query} onChange={this.onQueryChange} type="text"/>
              <span>CURRENTLY SELECTED</span>
                {_.map(this.props.selectedBrands, this.renderDeSelectedBrands)}
              <span>__________________</span>
              <span>BRANDS MATCHING YOUR SEARCH</span>
                {_.map(this.props.searchProperties.results, this.renderSelectedBrands)}
              <span>__________________</span>
              <button onClick={this.props.actions.triggerSearchPanel}>APPLY SELECTION</button>
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
