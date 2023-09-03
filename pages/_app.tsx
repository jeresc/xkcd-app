import { Footer, Header } from '@/components'
import { I18NProvider, useI18N } from '@/context/i18n'
import '@/styles/globals.css'
import { NextUIProvider } from '@nextui-org/react'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import Head from 'next/head'

const DefaultHeadApp = () => {
  const { t } = useI18N()
  return (
    <Head>
      <title>{t('SEO_DEFAULT_TITLE')}</title>
      <meta name="description" content="Comics for developers" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}

const inter = Inter({
  subsets: ['latin'],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <I18NProvider>
        <DefaultHeadApp />
        <Component {...pageProps} />
      </I18NProvider>
    </NextUIProvider>
  )
}
