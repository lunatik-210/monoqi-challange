
export const TRIGGER_BRAND_RANGE = 'TRIGGER_BRAND_RANGE'

export function triggerBrandRange (rangeName) {
  return {
    type: TRIGGER_BRAND_RANGE,
    rangeName: rangeName
  }
}
