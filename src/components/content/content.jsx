import React from 'react'

import Range from 'components/content/range/range'
import styles from 'components/content/content.scss'

import { DEFAULT_RANGES } from 'tools/grouper'

export default class Content extends React.Component {
  render() {
    return (
      <div onClick={this.triggerRange}>{DEFAULT_RANGES.map(this.renderRange)}</div>
    )
  }

  renderRange(range) {
    return <Range key={range} name={range} />
  }
}
