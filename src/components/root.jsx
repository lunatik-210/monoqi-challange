import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { triggerBrandRange } from 'redux/actions'
import Navbar from 'components/navbar/navbar'
import Content from 'components/content/content'

import styles from 'components/root.scss'

class Root extends React.Component {
  render () {
    return (
      <div className={styles['b-root']}>
        <Navbar />
        <Content actions={this.props.actions} groupedBrands={this.props.groupedBrands} />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    groupedBrands: state.groupedBrands
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({triggerBrandRange}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Root)
