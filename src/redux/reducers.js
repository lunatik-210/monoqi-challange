import _ from 'underscore'

import { TRIGGER_BRAND_RANGE,
  CHANGE_SEARCH_QUERY,
  TRIGGER_SEARCH_PANEL,
  SELECT_BRAND,
  DESELECT_BRAND
} from 'redux/actions'
import { BrandSearch } from 'tools/search'

function searchBrands (index, selectedBrands, query) {
  let brandSearch = new BrandSearch()
  let results = brandSearch.search(index, query)
  results = _.filter(results, (rBrand) => {
    return !_.find(selectedBrands, brand => brand.brand_id === rBrand.brand_id)
  })
  brandSearch = null
  return results
}

function triggerBrandRange (state, action) {
  switch (action.type) {
    case TRIGGER_BRAND_RANGE:
      if (state.name !== action.rangeName) { return state }
      return {
        ...state,
        isExpanded: !state.isExpanded
      }
    default:
      return state
  }
}

export default function reducer (state, action) {
  switch (action.type) {

    case SELECT_BRAND:
      if (_.find(state.selectedBrands, brand => brand.brand_id === action.brand.brand_id)) { return state }
      return {
        ...state,
        selectedBrands: [action.brand, ...state.selectedBrands],
        searchProperties: {
          ...state.searchProperties,
          results: _.filter(state.searchProperties.results, brand => brand.brand_id !== action.brand.brand_id)
        }
      }

    case DESELECT_BRAND:
      const selectedBrands = _.filter(state.selectedBrands, brand => brand.brand_id !== action.brand.brand_id)
      return {
        ...state,
        selectedBrands: selectedBrands,
        searchProperties: {
          ...state.searchProperties,
          results: searchBrands(state.index, selectedBrands, state.searchProperties.query)
        }
      }

    case TRIGGER_BRAND_RANGE:
      return {
        ...state,
        groupedBrands: _.map(state.groupedBrands, range => triggerBrandRange(range, action))
      }

    case TRIGGER_SEARCH_PANEL:
      return {
        ...state,
        searchProperties: {
          ...state.searchProperties,
          isExpanded: !state.searchProperties.isExpanded
        }
      }

    case CHANGE_SEARCH_QUERY:
      return {
        ...state,
        searchProperties: {
          ...state.searchProperties,
          query: action.query,
          results: searchBrands(state.index, state.selectedBrands, action.query)
        }
      }

    default:
      return state
  }
}
