import Head from 'next/head'
import { Raleway } from '@next/font/google'

import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'

import '../styles/globals.css'

config.autoAddCss = false

const font = Raleway({
  preload: true,
  display: 'swap',
  variable: '--primary-font',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
})

export default function AppLayout({ Component, pageProps }: any) {
  return (
    <div className={font.className}>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />

        <title>Projects - Akshay Nair</title>
        <meta name="description" content="List of projects made by Akshay Nair, who is a full-stack web developer based in India" />
      </Head>

      <Component {...pageProps} />
    </div>
  )
}
