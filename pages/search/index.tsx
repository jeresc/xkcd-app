import { Layout } from '@/components'
import { useI18N } from '@/context/i18n'
import { search } from '@/services/search'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

interface IProps {
  results: {
    id: number
    month: string
    link: string
    year: string
    safe_title: string
    alt: string
    img: string
    title: string
    day: string
  }[]
  query: string
}

export default function Search({ query, results }: IProps) {
  const { t } = useI18N()

  return (
    <>
      <Head>
        <title>xkcd - Results for {query}</title>
        <meta name="description" content={`Results for ${query}`} />
      </Head>
      <Layout>
        <h1>{t('SEARCH_RESULT_TITLE', results.length, query)}</h1>
        <section className="flex flex-col rounded-xl overflow-hidden">
          {results.map((comic) => (
            <Link
              href={`/comic/${comic.id}`}
              key={comic.id}
              className="gap-3 flex flex-row content-center justify-start bg-slate-300 hover:bg-slate-200 items-center"
            >
              <Image src={comic.img} alt={comic.alt} width={50} height={50} />
              <h2>{comic.title}</h2>
            </Link>
          ))}
        </section>
      </Layout>
    </>
  )
}

export async function getServerSideProps(context) {
  const { query } = context
  const { q = '' } = query

  const { results } = await search({ query: q })

  return {
    props: {
      query: q,
      results,
    },
  }
}
