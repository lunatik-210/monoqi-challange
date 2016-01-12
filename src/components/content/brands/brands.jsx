import React from 'react'
import _ from 'underscore'
import styles from 'components/content/brands/brands.scss'

export default class Brands extends React.Component {
  render() {
    return <div>{_.map(this.props.brands, this.renderBrand)}</div>
  }

  renderBrand(brand) {
    return <div className={styles['b-brand']} key={brand.brand_id}>{brand.brand_copy[0].brand_name}</div>
  }
}
