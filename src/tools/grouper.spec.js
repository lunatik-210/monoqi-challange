import _ from 'underscore';

import { normalizeString,
    stringsAreInAscendingOrder,
    addBrandToRangedBrandHash,
    groupBrandsByRanges } from 'tools/grouper';

describe('Test grouper tool', () => {
    describe('String normalizer', () => {
        it('"" should be normalized as empty string', () => {
            expect(normalizeString("")).to.equal('');
        });

        it('FoO FoO1 23!"№;%:?*(fOo)_+~`/`/ should be normalized as foofoo123foo', () => {
            expect(normalizeString('FoO FoO123!"№;%:?*(fOo)_+~`/')).to.equal('foofoo123foo');
        });
    });

    describe('String ascending order comparator', () => {
        it('Simple comparation: ab should be less than ba', () => {
            const s1 = 'ab';
            const s2 = 'ba';

            expect(stringsAreInAscendingOrder(s1, s2)).to.equal(false);
            expect(stringsAreInAscendingOrder(s2, s1)).to.equal(true);
        });

        it('Comparation with symblos: ab should be less than .ba', () => {
            const s1 = 'ab';
            const s2 = '.ba';

            expect(stringsAreInAscendingOrder(s1, s2)).to.equal(false);
            expect(stringsAreInAscendingOrder(s2, s1)).to.equal(true);
        });

        it('Comparation with uppercase letters: ab should be less than Ba', () => {
            const s1 = 'ab';
            const s2 = 'Ba';

            expect(stringsAreInAscendingOrder(s1, s2)).to.equal(false);
            expect(stringsAreInAscendingOrder(s2, s1)).to.equal(true);
        });

        it('Comparation with numbers: ab should be greater than 1Ba', () => {
            const s1 = 'ab';
            const s2 = '1Ba';

            expect(stringsAreInAscendingOrder(s1, s2)).to.equal(true);
            expect(stringsAreInAscendingOrder(s2, s1)).to.equal(false);
        });

        it('Comparation with equality flag = true: ab should be equal ab', () => {
            const s1 = 'ab';
            const s2 = 'ab';

            expect(stringsAreInAscendingOrder(s1, s2)).to.equal(false);
            expect(stringsAreInAscendingOrder(s1, s2, true)).to.equal(true);
        });
    });

    describe('Group brands by ranges', () => {
        const _brands = ['*81asdas3', '*81asdas3', '*51asdas3', '*-- 21asdas3', '-bsd9', '-asd9', '11asdas3', 'cg', '*91asdas3'];
        let brands = [];

        for(name of _brands) {
            brands.push({brand_copy: [{brand_name: name}]});
        }

        let rangedBrandHash = undefined;

        it('Brands should be grouped and sorted with ascending order', () => {
            rangedBrandHash = groupBrandsByRanges(brands);

            const rangedBrandsResult = {
                '0-9': [
                    {brand_copy: [{brand_name: '11asdas3'}]},
                    {brand_copy: [{brand_name: '*-- 21asdas3'}]},
                    {brand_copy: [{brand_name: '*51asdas3'}]},
                    {brand_copy: [{brand_name: '*81asdas3'}]},
                    {brand_copy: [{brand_name: '*81asdas3'}]},
                    {brand_copy: [{brand_name: '*91asdas3'}]}
                ],
                'A-B': [
                    {brand_copy: [{brand_name: '-asd9'}]},
                    {brand_copy: [{brand_name: '-bsd9'}]}
                ],
                'C-D': [
                    {brand_copy: [{brand_name: 'cg'}]}
                ]
            };

            expect(_.isEqual(rangedBrandHash, rangedBrandsResult)).to.equal(true);
        });

        it('New brands should be added in a correct order', () => {
            const rangedBrandsResult = {
                '0-9': [
                    {brand_copy: [{brand_name: '0*41asdas3'}]},
                    {brand_copy: [{brand_name: '11asdas3'}]},
                    {brand_copy: [{brand_name: '*-- 21asdas3'}]},
                    {brand_copy: [{brand_name: '*41asdas3'}]},
                    {brand_copy: [{brand_name: '*51asdas3'}]},
                    {brand_copy: [{brand_name: '*71asdas3'}]},
                    {brand_copy: [{brand_name: '*81asdas3'}]},
                    {brand_copy: [{brand_name: '*81asdas3'}]},
                    {brand_copy: [{brand_name: '*91asdas3'}]}
                ],
                'A-B': [
                    {brand_copy: [{brand_name: '-asd9'}]},
                    {brand_copy: [{brand_name: '-bsd9'}]}
                ],
                'C-D': [
                    {brand_copy: [{brand_name: 'cg'}]}
                ]
            };

            addBrandToRangedBrandHash(rangedBrandHash, {brand_copy: [{brand_name: '*71asdas3'}]});
            addBrandToRangedBrandHash(rangedBrandHash, {brand_copy: [{brand_name: '*41asdas3'}]});
            addBrandToRangedBrandHash(rangedBrandHash, {brand_copy: [{brand_name: '0*41asdas3'}]});

            expect(_.isEqual(rangedBrandHash, rangedBrandsResult)).to.equal(true);
        });

        it('Should be grouped with custom ranges', () => {
            let rangedBrandHash = groupBrandsByRanges(brands, ['0-3', '4-9', 'A-Z']);

            const rangedBrandsResult = {
                '0-3': [
                    {brand_copy: [{brand_name: '11asdas3'}]},
                    {brand_copy: [{brand_name: '*-- 21asdas3'}]}
                ],
                '4-9': [
                    {brand_copy: [{brand_name: '*51asdas3'}]},
                    {brand_copy: [{brand_name: '*81asdas3'}]},
                    {brand_copy: [{brand_name: '*81asdas3'}]},
                    {brand_copy: [{brand_name: '*91asdas3'}]}
                ],
                'A-Z': [
                    {brand_copy: [{brand_name: '-asd9'}]},
                    {brand_copy: [{brand_name: '-bsd9'}]},
                    {brand_copy: [{brand_name: 'cg'}]}
                ]
            };

            expect(_.isEqual(rangedBrandHash, rangedBrandsResult)).to.equal(true);
        });

        it('Should be grouped in one group', () => {
            let rangedBrandHash = groupBrandsByRanges(brands, ['0-Z']);

            const rangedBrandsResult = {
                '0-Z': [
                    {brand_copy: [{brand_name: '11asdas3'}]},
                    {brand_copy: [{brand_name: '*-- 21asdas3'}]},
                    {brand_copy: [{brand_name: '*51asdas3'}]},
                    {brand_copy: [{brand_name: '*81asdas3'}]},
                    {brand_copy: [{brand_name: '*81asdas3'}]},
                    {brand_copy: [{brand_name: '*91asdas3'}]},
                    {brand_copy: [{brand_name: '-asd9'}]},
                    {brand_copy: [{brand_name: '-bsd9'}]},
                    {brand_copy: [{brand_name: 'cg'}]}
                ]
            };

            expect(_.isEqual(rangedBrandHash, rangedBrandsResult)).to.equal(true);
        });

    });
});
