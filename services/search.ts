import algoliasearch from 'algoliasearch/lite'

const client = algoliasearch(
  `${process.env.ALGOLIA_APP_ID}`,
  `${process.env.ALGOLIA_API_KEY}`
)

const index = client.initIndex('prod_comics')

export const search = async ({ query }) => {
  const { hits } = await index.search(query, {
    hitsPerPage: 10,
    attributesToRetrieve: ['id', 'title', 'img', 'alt'],
  })

  return { results: hits }
}
