import { Header } from '@/components'
import '@/styles/globals.css'
import { NextUIProvider } from '@nextui-org/react'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <main className={inter.className}>
        <Header />
        <Component {...pageProps} />
      </main>
    </NextUIProvider>
  )
}
