import React from 'react'
import _ from 'underscore'

import Range from 'components/content/range/range'
import Brands from 'components/content/brands/brands'
import styles from 'components/content/content.scss'

import { DEFAULT_RANGES } from 'tools/grouper'

export default class Content extends React.Component {
  constructor (props) {
    super(props)

    this.renderRangedBrands = this.renderRangedBrands.bind(this)
  }

  render () {
    return (
      <div>{_.map(this.props.groupedBrands, this.renderRangedBrands)}</div>
    )
  }

  renderRangedBrands (range) {
    var brandsStyles = {
      display: range.isExpanded ? 'block' : 'none'
    }

    return (
      <div key={range.name}>
        <Range onClick={this.props.actions.triggerBrandRange} name={range.name} isExpanded={range.isExpanded} />
        <div style={brandsStyles}>
          <Brands brands={range.brands} />
        </div>
      </div>
    )
  }
}
