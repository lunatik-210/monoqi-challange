import nGram from 'n-gram';
import _ from 'underscore';

/*
    BrandSearch users nGram based https://en.wikipedia.org/wiki/N-gram search algorythm inspired by 
    http://glench.github.io/fuzzyset.js/ but with much more simplier implementation.

    1) We build inverted indexes || ngrams given brand names. Each brand name we split on [3, 2, 1] grams (by default). 
    Example: flxble -> ['flx', 'lxb', 'xbl', 'ble']

    2) In order to search for brands we take the n-grams of the query string and perform a reverse index look up for each gram.
    Once we collected all the brands we use Levenshtein distance score (https://en.wikipedia.org/wiki/Levenshtein_distance) in order 
    to sort and filter results that allows to display the most relevant information.
*/

export class BrandSearch {
    constructor(brands, gramSizeLower = 1, gramSizeUpper = 3, resultLimit = 10) {
        this.gramSizeLower = gramSizeLower;
        this.gramSizeUpper = gramSizeUpper;
        this.resultLimit = resultLimit;

        this.buildIndex(brands);
    }

    buildIndex(brands) {
        this.ngrams = {};

        // initialize ngrams inverted indexes from gramSizeLower to gramSizeUpper
        for(let i = this.gramSizeLower; i<=this.gramSizeUpper; ++i) {
            this.ngrams[i] = {};
        }

        // building indexes for each brand
        for(let brand of brands) {
            const normalizedName = brand.brand_copy[0].brand_name.toLowerCase();

            // building indexes for each size of gram
            for(let gramSize = this.gramSizeLower; gramSize<=this.gramSizeUpper; ++gramSize) {
                let nGrams = nGram(gramSize)(normalizedName);

                for(let gram of nGrams) {
                    if(!this.ngrams[gramSize][gram]) {
                        this.ngrams[gramSize][gram] = [];
                    }

                    if(!_.find(this.ngrams[gramSize][gram], (index) => index.name === normalizedName)) {
                        this.ngrams[gramSize][gram].push({
                            name: normalizedName,
                            brand: brand
                        });
                    }
                }
            }
        }
    }

    search(query, resultLimit) {
        let normalizedQuery = query.toLowerCase();

        let results = [];

        // falls down to lower grams once there are no results found
        for(let gramSize = this.gramSizeUpper; gramSize >= this.gramSizeLower; --gramSize) {
            let queryGrams = nGram(gramSize)(normalizedQuery);

            for(let gram of queryGrams) {
                if(this.ngrams[gramSize][gram] && this.ngrams[gramSize][gram].length !== 0) {
                    results = results.concat(this.ngrams[gramSize][gram]);
                }
            }

            if(results.length > 0) { break; }
        }

        // retrieve brands from each gram of normalizedQuery
        for(let i = 0; i<results.length; ++i) {
            let score = this.distance(normalizedQuery, results[i].name);
            results[i].score = this.distance(normalizedQuery, results[i].name);
        }

        results = _.sortBy(results, (index) => -index.score);
        results = _.map(results, (index) => index.brand);

        return results.slice(0, resultLimit || this.resultLimit);
    }

    // https://github.com/Glench/fuzzyset.js/blob/master/lib/fuzzyset.js#L41
    distance(str1, str2) {
        if (str1 === null || str2 === null) return 0;
        str1 = String(str1); str2 = String(str2);

        var distance = this.levenshtein(str1, str2);
        if (str1.length > str2.length) {
            return 1 - distance / str1.length;
        }

        return 1 - distance / str2.length;
    }

    // https://github.com/Glench/fuzzyset.js/blob/master/lib/fuzzyset.js#L20
    levenshtein(str1, str2) {
        var current = [], prev, value;

        for (var i = 0; i <= str2.length; i++) {
            for (var j = 0; j <= str1.length; j++) {
                if (i && j) {
                    if (str1.charAt(j - 1) === str2.charAt(i - 1)) {
                        value = prev;
                    } else {
                        value = Math.min(current[j], current[j - 1], prev) + 1;
                    }
                } else {
                    value = i + j;
                }

                prev = current[j];
                current[j] = value;
            }            
        }
        return current.pop();
    }
}
