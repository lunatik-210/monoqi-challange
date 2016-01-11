import React from 'react'
import _ from 'underscore'
import styles from 'components/content/brands/brands.scss'

export default class Brands extends React.Component {
  render() {
    return  <div>{_.map(this.props.brands, this.renderBrand)}</div>
  }

  renderBrand(brand) {
    return <div key={brand.brand_id} className={styles['b-group']}>{brand.brand_copy[0].brand_name}</div>
  }
}
