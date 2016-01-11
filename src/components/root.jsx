import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import actions from 'redux/actions'
import Navbar from 'components/navbar/navbar'
import Content from 'components/content/content'

import styles from 'components/root.scss'

class Root extends React.Component {
  render () {
    return (
      <div className={styles['b-root']}>
        <Navbar actions={this.props.actions} selectedBrands={this.props.selectedBrands} searchProperties={this.props.searchProperties} />
        <Content actions={this.props.actions} groupedBrands={this.props.groupedBrands} />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    selectedBrands: state.selectedBrands,
    groupedBrands: state.groupedBrands,
    searchProperties: state.searchProperties
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Root)
