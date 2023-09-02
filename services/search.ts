import algoliasearch from 'algoliasearch/lite'

const client = algoliasearch(
  `${process.env.ALGOLIA_APP_ID}`,
  `${process.env.ALGOLIA_API_KEY}`
)

const index = client.initIndex('prod_comics')

interface IApiResponse {
  id: number
  title: string
  img: string
  alt: string
}

interface ICache {
  [query: string]: IApiResponse[]
}

const CACHE: ICache = {}

interface ISearchRequest {
  query: string
}

export const search = async ({ query }: ISearchRequest) => {
  if (query in CACHE) return { results: CACHE[query] }

  const { hits } = await index.search(query, {
    hitsPerPage: 10,
    attributesToRetrieve: ['id', 'title', 'img', 'alt'],
  })

  return { results: hits }
}
