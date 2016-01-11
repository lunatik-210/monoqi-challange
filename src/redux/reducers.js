import _ from 'underscore'

import { TRIGGER_BRAND_RANGE,
  CHANGE_SEARCH_QUERY
} from 'redux/actions'

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

    case CHANGE_SEARCH_QUERY:
      return {
        ...state,
        searchProperties: {
          ...state.searchProperties,
          query: action.query
        }
      }

    default:
      return state
  }
}
