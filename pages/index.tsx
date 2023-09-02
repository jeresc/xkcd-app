import Head from 'next/head'
import fs from 'fs/promises'
import Image from 'next/image'
import Link from 'next/link'
import { Layout } from '@/components'

interface comic {
  id: number
  month: string
  link: string
  year: string
  safe_title: string
  alt: string
  img: string
  title: string
  day: string
}

interface IProps {
  latestComics: comic[]
}

export default function Home({ latestComics }: IProps) {
  return (
    <>
      <Head>
        <title>xkcd - Comics for developers</title>
        <meta name="description" content="Comics for developers" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <h2 className="text-2xl font-bold text-center">Latest Comics</h2>
        <section
          className="grid grid-cols-1 gap-2 max-w-xl mx-auto sm:grid-cols-2
          md:grid-cols-3"
        >
          {latestComics.map((comic) => (
            <Link
              href={`/comic/${comic.id}`}
              key={comic.id}
              className="pb-4 mb-4 mx-auto"
            >
              <h3 className="font-bold text-sm text-center mb-2">
                {comic.title}
              </h3>
              <Image
                src={comic.img}
                alt={comic.alt}
                width={400}
                height={400}
                objectFit="contain"
                layout="intrinsic"
              />
            </Link>
          ))}
        </section>
      </Layout>
    </>
  )
}

export const getStaticProps = async () => {
  const files = await fs.readdir('./comics')
  const latestComicsFiles = files.slice(-8, files.length)

  const promisesReadFiles = latestComicsFiles.map(async (file) => {
    const content = await fs.readFile(`./comics/${file}`, 'utf-8')
    return JSON.parse(content)
  })

  const latestComics = await Promise.all(promisesReadFiles)

  return {
    props: {
      latestComics,
    },
  }
}
