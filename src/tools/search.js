import nGram from 'n-gram'
import _ from 'underscore'

/*
  BrandSearch users nGram based https://en.wikipedia.org/wiki/N-gram search algorythm inspired by
  http://glench.github.io/fuzzyset.js/ but with much more simplier implementation.

  1) We build inverted indexes || ngramsIndex given brand names. Each brand name we split on [3, 2, 1] grams (by default).
  Example: flxble -> ['flx', 'lxb', 'xbl', 'ble']

  2) In order to search for brands we take the n-grams of the query string and perform a reverse index look up for each gram.
  Once we collected all the brands we use Levenshtein distance score (https://en.wikipedia.org/wiki/Levenshtein_distance) in order
  to sort and filter results that allows to display the most relevant information.
*/

export class BrandSearch {
  constructor (gramSizeLower = 1, gramSizeUpper = 3, resultLimit = 10) {
    this.gramSizeLower = gramSizeLower
    this.gramSizeUpper = gramSizeUpper
    this.resultLimit = resultLimit
  }

  buildIndex (brands) {
    let ngramsIndex = {}

    // initialize ngramsIndex inverted indexes from gramSizeLower to gramSizeUpper
    for (let i = this.gramSizeLower; i <= this.gramSizeUpper; ++i) {
      ngramsIndex[i] = {}
    }

    // building indexes for each brand
    for (let brand of brands) {
      this.addBrandToIndex(ngramsIndex, brand)
    }

    return ngramsIndex;
  }

  addBrandToIndex (index, brand) {
    const normalizedName = brand.brand_copy[0].brand_name.toLowerCase()

    // building indexes for each size of gram
    for (let gramSize = this.gramSizeLower; gramSize <= this.gramSizeUpper; ++gramSize) {
      let ngrams = nGram(gramSize)(normalizedName)

      for (let gram of ngrams) {
        if (!index[gramSize][gram]) {
          index[gramSize][gram] = []
        }

        if (!_.find(index[gramSize][gram], (index) => index.name === normalizedName)) {
          index[gramSize][gram].push({
            name: normalizedName,
            brand: brand
          })
        }
      }
    }
  }

  search (ngramsIndex, query, resultLimit) {
    let normalizedQuery = query.toLowerCase()

    let results = this._reverseIndexLookup(ngramsIndex, normalizedQuery)

    this._assignScoreToResults(results, normalizedQuery)

    results = _.sortBy(results, (index) => -index.score)
    results = _.map(results, (index) => index.brand)

    return results.slice(0, resultLimit || this.resultLimit)
  }

  _reverseIndexLookup (ngramsIndex, normalizedQuery) {
    let results = []

    // falls down to lower grams once there are no results found
    for (let gramSize = this.gramSizeUpper; gramSize >= this.gramSizeLower; --gramSize) {
      let queryGrams = nGram(gramSize)(normalizedQuery)

      for (let gram of queryGrams) {
        if (ngramsIndex[gramSize][gram] && ngramsIndex[gramSize][gram].length !== 0) {
          results = results.concat(ngramsIndex[gramSize][gram])
        }
      }

      if (results.length > 0) { return results }
    }

    return results
  }

  _assignScoreToResults (results, normalizedQuery) {
    for (let i = 0; i < results.length; ++i) {
      results[i].score = this._distance(normalizedQuery, results[i].name)
    }    
  }

  // https://github.com/Glench/fuzzyset.js/blob/master/lib/fuzzyset.js#L41
  _distance (str1, str2) {
    if (str1 === null || str2 === null) { return 0 }
    str1 = String(str1); str2 = String(str2)

    var distance = this._levenshtein(str1, str2)
    if (str1.length > str2.length) {
      return 1 - distance / str1.length
    }

    return 1 - distance / str2.length
  }

  // https://github.com/Glench/fuzzyset.js/blob/master/lib/fuzzyset.js#L20
  _levenshtein (str1, str2) {
    var current = []
    var prev
    var value

    for (var i = 0; i <= str2.length; i++) {
      for (var j = 0; j <= str1.length; j++) {
        if (i && j) {
          if (str1.charAt(j - 1) === str2.charAt(i - 1)) {
            value = prev
          } else {
            value = Math.min(current[j], current[j - 1], prev) + 1
          }
        } else {
          value = i + j
        }

        prev = current[j]
        current[j] = value
      }
    }
    return current.pop()
  }
}
