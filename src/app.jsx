import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import _ from 'underscore'

import { groupBrandsByRanges } from 'tools/grouper'
import createStore from 'redux/store'
import Root from 'components/root'

import brands from 'assets/brands.json'
import 'styles/global.scss'

function createState() {
  const groupedBrands = _.map(groupBrandsByRanges(brands.collection_results), (brands, range) => { 
    return {
      brands: brands, 
      name: range, 
      isExpanded: false
    }
  })

  return {
    brands: brands.collection_results,
    groupedBrands: _.sortBy(groupedBrands, range => range.name[0]),
    searchProperties: {
      isExpanded: false,
      query: "",
      results: []
    }
  }
}

ReactDOM.render(
  <Provider store={createStore(createState())}>
    <Root />
  </Provider>,
  document.getElementById('root')
)
