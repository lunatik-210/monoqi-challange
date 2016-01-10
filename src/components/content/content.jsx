import React from 'react'

import { DEFAULT_RANGES } from 'tools/grouper';
import { BrandSearch } from 'tools/search';

import styles from 'components/content/content.scss'

export default class Content extends React.Component {
  render() {
    return (
      <div>{DEFAULT_RANGES.map(this.renderRange)}</div>
    );
  }

  renderRange(range, index) {
    const rangeName = '> ' + range

    return (
      <div key={index}>
        <span>{rangeName}</span>
      </div>
    );
  }
}
