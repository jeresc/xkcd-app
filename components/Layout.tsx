import { Footer, Header } from '.'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="max-w-xl m-auto">{children}</main>
      <Footer />
    </>
  )
}
