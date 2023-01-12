import Head from 'next/head'
import { Raleway } from '@next/font/google'
import '../styles/globals.css'
import { Header } from '../components/Header'

const font = Raleway({
  preload: true,
})

export default function AppLayout({ Component, pageProps }: any) {
  return (
    <div className={font.className}>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

        <title>Projects - Akshay Nair</title>
        <meta name="description" content="List of projects made by Akshay Nair, who is a full-stack web developer based in India" />
      </Head>

      <Header />
      <Component {...pageProps} />
    </div>
  )
}
