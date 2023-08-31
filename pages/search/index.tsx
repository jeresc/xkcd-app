import { Layout } from '@/components'
import { search } from '@/services/search'
import Head from 'next/head'

export default function Search({ query }: { query: string }) {
  return (
    <>
      <Head>
        <title>xkcd - Results for {query}</title>
        <meta name="description" content={`Results for ${query}`} />
      </Head>
      <Layout>
        <h1>Resultados de {query}</h1>
      </Layout>
    </>
  )
}

export async function getServerSideProps(context) {
  const { query } = context
  const { q = '' } = query

  const { results } = await search(q)

  return {
    props: {
      query: q,
      results,
    },
  }
}
