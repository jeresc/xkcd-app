import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useRef, useState } from 'react'

interface IApiResponse {
  id: number
  title: string
  img: string
  alt: string
}

export function Header() {
  const [results, setResults] = useState<IApiResponse[]>([])
  const searchRef = useRef<HTMLInputElement>(null)
  const { locale, locales } = useRouter()

  let q = searchRef.current?.value
  const handleChange = () => {
    q = searchRef.current?.value
    if (!q) return setResults([])
    fetch(`/api/search?q=${q}`)
      .then((res) => res.json())
      .then((searchResults) => {
        setResults(searchResults)
      })
  }

  const restOfLocales = locales.filter((l) => l !== locale)

  {
    /* const showLocales = () => {
    const restOfLocales = locales.filter((l) => l !== locale)
    return {
      selectedLocale: locale,
      restOfLocales,
    }
  } */
  }

  return (
    <header className="flex items-center justify-between p-4 max-w-xl mx-auto">
      <Link href="/">
        <h1 className="font-bold text-inherit text-base">
          next<span className="font-light">xkcd</span>
        </h1>
      </Link>
      <nav className="gap-4">
        <ul className="flex gap-4 text-base font-bold">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/" locale={restOfLocales[0]}>
              {restOfLocales[0]}
            </Link>
          </li>
          <li>
            <input
              ref={searchRef}
              type="search"
              onChange={handleChange}
              className="rounded-lg border-gray-400 px-4 py-1 border-2 text-xs outline-none"
            />
            <div className="relative">
              {Boolean(results.length) ? (
                <div className="absolute top-1 left-0 w-full">
                  <ul className="bg-white w-full border rounded-lg shadow-xl boder-gray-50 overflow-hidden">
                    <li className="m-0" key="all-results">
                      <Link
                        href={`/search?q=${q}`}
                        className="px-2 py-1 hover:bg-slate-200 text-sm font-semibold text-ellipsis overflow-hidden whitespace-nowrap text-gray-400 italic block"
                      >
                        Show {results.length} results
                      </Link>
                    </li>
                    {results.map((result) => (
                      <li key={result.id} className="m-0">
                        <Link
                          href={`/comic/${result.id}`}
                          className=" hover:bg-slate-200 px-2 py-1 text-sm font-semibold text-ellipsis overflow-hidden whitespace-nowrap block"
                        >
                          {result.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <></>
              )}
            </div>
          </li>
        </ul>
      </nav>
    </header>
  )
}
