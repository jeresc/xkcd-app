import { useRouter } from 'next/router'
import { createContext, useCallback, useContext } from 'react'
import es from '../translations/es.json'
import en from '../translations/en.json'

interface IProps {
  children: React.ReactNode
}

const languages = { es, en }

// https://eldiario.es/noticias/123-el-rey-deja-su-cargo
// const id = "como-hacer-comics-en-etc-123".split("-").at(-1)

const I18NContext = createContext({
  t: (key: string, ..._args: string[]) => key,
})

export function I18NProvider({ children }: IProps) {
  const { locale } = useRouter()
  const t = useCallback(
    (key: string, ...args: string[]) => {
      const translation: string = languages[locale][key]
      if (args.length === 0) return translation

      return translation && translation.replace(/\${(\d+)}/g, (_, i) => args[i])
    },
    [locale]
  )
  return <I18NContext.Provider value={{ t }}>{children}</I18NContext.Provider>
}

export function useI18N() {
  const context = useContext(I18NContext)
  if (context === undefined) {
    throw new Error('useI18N must be used within a I18NProvider')
  }
  return context
}
