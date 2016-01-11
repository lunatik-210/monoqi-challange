import _ from 'underscore'

import { TRIGGER_BRAND_RANGE,
  CHANGE_SEARCH_QUERY,
  TRIGGER_SEARCH_PANEL
} from 'redux/actions'
import { BrandSearch } from 'tools/search'

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
      let brandSearch = new BrandSearch()
      const results = brandSearch.search(state.index, action.query)
      brandSearch = null

      return {
        ...state,
        searchProperties: {
          ...state.searchProperties,
          query: action.query,
          results: results
        }
      }

    default:
      return state
  }
}
