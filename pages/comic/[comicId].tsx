import { Layout } from '@/components'
import { readFile, readdir, stat } from 'fs/promises'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { basename } from 'path'
import React from 'react'

interface IProps {
  id: number
  img: string
  alt: string
  title: string
  width: number
  height: number
  hasNext: boolean
  hasPrevious: boolean
  nextId: number
  prevId: number
}

export default function Comic({
  img,
  alt,
  title,
  width,
  height,
  hasNext,
  hasPrevious,
  nextId,
  prevId,
}: IProps) {
  return (
    <>
      <Head>
        <title>xkcd - Comics for developers</title>
        <meta name="description" content="Comics for developers" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <section className="max-w-lg m-auto">
          <h1 className="text-xl font-bold text-center mb-4">{title}</h1>
          <div className="max-w-sm m-auto mb-4">
            <Image
              layout="responsive"
              src={img}
              alt={alt}
              width={width}
              height={height}
            />
          </div>

          <p>{alt}</p>

          <div className="w-full flex justify-between mt-4 font-bold">
            {hasPrevious && (
              <Link className="text-gray-600" href={`/comic/${prevId}`}>
                {'<'} Previous
              </Link>
            )}
            {hasNext && (
              <Link className="text-gray-600" href={`/comic/${nextId}`}>
                Next {'>'}
              </Link>
            )}
          </div>
        </section>
      </Layout>
    </>
  )
}

export async function getStaticPaths() {
  const files = await readdir('./comics')
  const paths = files.map((file) => ({
    params: { comicId: basename(file, '.json') },
  }))

  return {
    paths,
    fallback: true, // false or blocking
  }
}

interface IParams {
  params: {
    comicId: string
  }
}

export async function getStaticProps({ params }: IParams) {
  const { comicId } = params
  const fileContent = await readFile(`./comics/${comicId}.json`, 'utf8')
  const comic = JSON.parse(fileContent)

  const idNumber = +comicId
  const prevId = idNumber - 1
  const nextId = idNumber + 1

  const [prevResult, nextResult] = await Promise.allSettled([
    stat(`./comics/${prevId}.json`),
    stat(`./comics/${nextId}.json`),
  ])

  const hasPrevious = prevResult.status === 'fulfilled'
  const hasNext = nextResult.status === 'fulfilled'

  return {
    props: {
      ...comic,
      hasPrevious,
      hasNext,
      prevId,
      nextId,
    },
  }
}
