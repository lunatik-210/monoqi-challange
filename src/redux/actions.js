
export const TRIGGER_BRAND_RANGE = 'TRIGGER_BRAND_RANGE'
export const CHANGE_SEARCH_QUERY = 'CHANGE_SEARCH_QUERY'

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

export default { triggerBrandRange,
changeSearchQuery }
