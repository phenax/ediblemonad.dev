import { Raleway } from '@next/font/google'
import '../styles/globals.css'
import { Header } from '../components/Header'

const font = Raleway({
  preload: true,
})

export default function AppLayout({ Component, pageProps }: any) {
  return (
    <div className={font.className}>
      <Header />

      <Component {...pageProps} />
    </div>
  )
}
