
import { TRIGGER_BRAND_RANGE } from 'redux/actions'
import _ from 'underscore'

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
    default:
      return state
  }
}
