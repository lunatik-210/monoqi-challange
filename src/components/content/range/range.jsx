import React from 'react'

import styles from 'components/content/range/range.scss'

export default class Range extends React.Component {
  constructor(props) {
    super(props)

    this.triggerRange = this.triggerRange.bind(this, this.props.name)
  }

  render() {
    const rangeName = '> ' + this.props.name
    return <span className={styles['b-rnage']} onClick={this.triggerRange}>{rangeName}</span>
  }

  triggerRange(name, e) {
    console.log(name)
  }
}
