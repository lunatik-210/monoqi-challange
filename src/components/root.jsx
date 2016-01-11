import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Navbar from 'components/navbar/navbar'
import Content from 'components/content/content'

import styles from 'components/root.scss'

export default class Root extends React.Component {
  render() {
    return (
      <div className={styles['b-root']}>
        <Navbar />
        <Content />
      </div>
    );
  }
}

var mapStateToProps = function (state) {
  return state;
}

var mapDispatchToProps = function (dispatch) {
  return {
    actions: bindActionCreators({}, dispatch)
  }
}

connect(mapStateToProps, mapDispatchToProps)(Root)
