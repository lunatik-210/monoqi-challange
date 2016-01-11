
export const TRIGGER_BRAND_RANGE = 'TRIGGER_BRAND_RANGE'
export const CHANGE_SEARCH_QUERY = 'CHANGE_SEARCH_QUERY'
export const TRIGGER_SEARCH_PANEL = 'TRIGGER_SEARCH_PANEL'

export function triggerBrandRange (rangeName) {
  return {
    type: TRIGGER_BRAND_RANGE,
    rangeName: rangeName
  }
}

export function changeSearchQuery (query) {
  return {
    type: CHANGE_SEARCH_QUERY,
    query: query
  }
}

export function triggerSearchPanel () {
  return {
    type: TRIGGER_SEARCH_PANEL
  }
}

export default { triggerBrandRange,
  changeSearchQuery,
  triggerSearchPanel }
