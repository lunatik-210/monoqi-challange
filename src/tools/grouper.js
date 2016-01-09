import _ from 'underscore';

const NON_WORD_REGEXP = /[^A-Za-z0-9]/g;
const DEFAULT_RANGES = ['0-9', 'A-B', 'C-D', 'E-F', 'G-H', 'I-J', 'K-L', 'M-N', 'O-P', 'Q-R', 'S-T', 'U-V', 'W-X', 'Y-Z'];

export function normalizeString(s) {
    return s.replace(NON_WORD_REGEXP, '').toLowerCase();
}

export function stringsAreInAscendingOrder(s1, s2, equality=false) {
    if(equality) return normalizeString(s1) >= normalizeString(s2)
    return normalizeString(s1) > normalizeString(s2);
}

export function groupBrandsByRanges(brands, ranges=DEFAULT_RANGES) {
    let rangeBrandsHash = {};

    for(let brand of brands) {
        addBrandToRangedBrandHash(rangeBrandsHash, brand, ranges);
    }

    return rangeBrandsHash;
}

export function addBrandToRangedBrandHash(rangeBrandsHash, brand, ranges=DEFAULT_RANGES) {
    const range = getBrandRange(brand.brand_copy[0].brand_name, ranges);

    if(!range) { return; }

    if(!rangeBrandsHash[range]) { rangeBrandsHash[range] = []; }

    brandFastInsert(rangeBrandsHash[range], brand);
}

export function getBrandRange(brandName, ranges=DEFAULT_RANGES) {
    const normalizedName = normalizeString(brandName);

    if(normalizedName.length === 0) { return undefined };

    const zeroChar = normalizedName.charAt(0).toUpperCase();

    for(let range of ranges) {
        const left = range.charAt(0);
        const right = range.charAt(2);

        if(zeroChar >= left && zeroChar <= right) {
            return range;
        }        
    }

    return undefined;
}

export function brandFastInsert(brands, brand) {
    if(brands.length === 0) {
        brands.push(brand);
        return;
    }

    if(brands.length === 1) {
        if(stringsAreInAscendingOrder(brand.brand_copy[0].brand_name, brands[0].brand_copy[0].brand_name, true)) {
            brands.push(brand);
        } else {
            brands.splice(0, 0, brand);
        }
        return;
    }

    _brandFastInsert(brands, brand, 0, brands.length);
}

export function _brandFastInsert(brands, brand, l, r) {
    const middle = (l+r) >> 1;
    const brandName = brand.brand_copy[0].brand_name;

    if(middle === 0 && stringsAreInAscendingOrder(brands[0].brand_copy[0].brand_name, brandName, true)) {
        brands.splice(0, 0, brand);
        return;
    }

    if(middle === brands.length-1 && !stringsAreInAscendingOrder(brands[brands.length-1].brand_copy[0].brand_name, brandName, true)) {
        brands.push(brand);
        return;
    }

    if(middle !== 0 && !stringsAreInAscendingOrder(brands[middle-1].brand_copy[0].brand_name, brandName, true) && 
       stringsAreInAscendingOrder(brands[middle].brand_copy[0].brand_name, brandName, true)) {
        brands.splice(middle, 0, brand);
        return;
    }

    if(middle !== brands.length-1 && !stringsAreInAscendingOrder(brands[middle].brand_copy[0].brand_name, brandName, true) && 
       stringsAreInAscendingOrder(brands[middle+1].brand_copy[0].brand_name, brandName, true)) {
        brands.splice(middle+1, 0, brand);
        return;
    }
    
    if(stringsAreInAscendingOrder(brands[middle-1].brand_copy[0].brand_name, brandName)) {
        return _brandFastInsert(brands, brand, l, middle-1);
    }

    if(!stringsAreInAscendingOrder(brands[middle+1].brand_copy[0].brand_name, brandName)) {
        return _brandFastInsert(brands, brand, middle+1, r);
    }
}
