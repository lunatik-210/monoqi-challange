const NON_WORD_REGEXP = /[^A-Za-z0-9]/g

export const DEFAULT_RANGES = ['0-9', 'A-B', 'C-D', 'E-F', 'G-H', 'I-J', 'K-L', 'M-N', 'O-P', 'Q-R', 'S-T', 'U-V', 'W-X', 'Y-Z']

export function groupBrandsByRanges (brands, ranges = DEFAULT_RANGES) {
  let rangeBrandsHash = {}

  for (let brand of brands) {
    addBrandToRangedBrandHash(rangeBrandsHash, brand, ranges)
  }

  return rangeBrandsHash
}

export function addBrandToRangedBrandHash (rangeBrandsHash, brand, ranges = DEFAULT_RANGES) {
  const range = getBrandRange(brand.brand_copy[0].brand_name, ranges)

  if (!range) { return }

  if (!rangeBrandsHash[range]) { rangeBrandsHash[range] = [] }

  brandFastInsert(rangeBrandsHash[range], brand)
}

export function normalizeString (s) {
  return s.replace(NON_WORD_REGEXP, '').toLowerCase()
}

export function stringsAreInDescendingOrder (s1, s2, equality = false) {
  if (equality) { return normalizeString(s1) >= normalizeString(s2) }
  return normalizeString(s1) > normalizeString(s2)
}

export function stringsAreInAscendingOrder (s1, s2, equality = false) {
  if (equality) { return normalizeString(s1) <= normalizeString(s2) }
  return normalizeString(s1) < normalizeString(s2)
}

function getBrandRange (brandName, ranges = DEFAULT_RANGES) {
  const normalizedName = normalizeString(brandName)

  if (normalizedName.length === 0) { return undefined }

  const zeroChar = normalizedName.charAt(0).toUpperCase()

  for (let range of ranges) {
    const left = range.charAt(0)
    const right = range.charAt(2)

    if (zeroChar >= left && zeroChar <= right) {
      return range
    }
  }

  return undefined
}

// here i'm using binary insertion algorithm with slight modification
// http://machinesaredigging.com/2014/04/27/binary-insert-how-to-keep-an-array-sorted-as-you-insert-data-in-it/
function brandFastInsert (brands, brand, left, right) {
  const length = brands.length
  const l = typeof (left) !== 'undefined' ? left : 0
  const r = typeof (right) !== 'undefined' ? right : length - 1
  const m = (l + r) >> 1
  const brandName = brand.brand_copy[0].brand_name

  if (brands.length === 0) {
    brands.push(brand)
    return
  }

  if (stringsAreInDescendingOrder(brandName, brands[r].brand_copy[0].brand_name, true)) {
    brands.splice(r + 1, 0, brand)
    return
  }

  if (stringsAreInAscendingOrder(brandName, brands[l].brand_copy[0].brand_name, true)) {
    brands.splice(l, 0, brand)
    return
  }

  if (l >= r) { return }

  if (stringsAreInAscendingOrder(brandName, brands[m].brand_copy[0].brand_name, true)) {
    brandFastInsert(brands, brand, l, m - 1)
    return
  }

  if (stringsAreInDescendingOrder(brandName, brands[m].brand_copy[0].brand_name, true)) {
    brandFastInsert(brands, brand, m + 1, r)
    return
  }
}
