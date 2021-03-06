import { BrandSearch } from 'tools/search'

describe('Search tool', () => {
  const _brands = ['*81asdas3', '*81asdas3', '*51asdas3', '*-- 21asdas3', '-bsd9', '-asd9', '11asdas3', 'cg', '*91asdas3']
  let brands = [];

  for(name of _brands) {
    brands.push({brand_copy: [{brand_name: name}]})
  }

  it('BrandSearch should retrive results on search queries', () => {
    let brandSearch = new BrandSearch()

    let index = brandSearch.buildIndex(brands)

    let results = brandSearch.search(index, '')
    expect(results.length).to.equal(0)

    results = brandSearch.search(index, 'asd')
    expect(results.length).to.equal(1)
    expect(results[0].brand_copy[0].brand_name).to.equal('*81asdas3')

    results = brandSearch.search(index, '91')
    expect(results.length).to.equal(1)
    expect(results[0].brand_copy[0].brand_name).to.equal('*91asdas3')

    results = brandSearch.search(index, '--')
    expect(results.length).to.equal(1)
    expect(results[0].brand_copy[0].brand_name).to.equal('*-- 21asdas3')
  })
})
