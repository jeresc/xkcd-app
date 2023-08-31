import Link from 'next/link'
import React from 'react'

export function Header() {
  return (
    <header className="flex items-center justify-between p-4 max-w-xl mx-auto">
      <Link href="/">
        <h1 className="font-bold text-inherit text-base">
          next<span className="font-light">xkcd</span>
        </h1>
      </Link>
      <nav className="gap-4">
        <ul className="flex gap-4 text-base font-bold">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/comic">Search</Link>
        </ul>
      </nav>
    </header>
  )
}
