export const state = () => ({
  blogPosts: [],
  treatments: [],
  prices: {},
})

export const mutations = {
  setBlogPosts(state, list) {
    state.blogPosts = list
  },
  setTreaments(state, list) {
    state.treatments = list
  },
  setPrices(state, map) {
    state.prices = map
  },
}

function defaultMapper(files) {
  return files.keys().map(key => {
    let r = files(key)
    r.slug = key.slice(2, -5)
    return r
  })
}

export const actions = {
  async nuxtServerInit({ commit }) {
    async function loadAndCommit(context, mutation, mapper) {
      const files = await context
      const data = mapper(files)
      await commit(mutation, data)
    }

    const blogFiles = require.context('~/assets/content/blog/', false, /\.json$/)
    const treatmentFiles = require.context('~/assets/content/treatment/', false, /\.json$/)
    const prices = require.context('~/assets/content/price/', false, /\.json$/)

    for (let x of [
      loadAndCommit(blogFiles, 'setBlogPosts', defaultMapper),
      loadAndCommit(treatmentFiles, 'setTreaments', defaultMapper),
      loadAndCommit(prices, 'setPrices', files => {
        const prices = defaultMapper(files)
        const priceMap = {}
        for (const price of prices) {
          priceMap[price.title] = price
        }
        return priceMap
      }),
    ]) await x
  },
}
