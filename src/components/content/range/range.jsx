import React from 'react'

import styles from 'components/content/range/range.scss'

export default class Range extends React.Component {
  constructor(props) {
    super(props)

    this.triggerRange = this.triggerRange.bind(this, this.props.name)
  }

  render() {
    const rangeName = '> ' + this.props.name
    const styleRange = {
      background: this.props.isExpanded ? '#EEEEEE' : 'white'
    }
    return <span style={styleRange} className={styles['b-rnage']} onClick={this.triggerRange}>{rangeName}</span>
  }

  triggerRange(rangeName, e) {
    this.props.onClick(rangeName)
  }
}
