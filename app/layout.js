import './globals.css'
import { Inter } from 'next/font/google'

import Head from "next/head";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Moogle Search',
  description: 'A FFXIV search engine to look through all languages simultaneously.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>Moogle Search</title>
        <meta
          name="description"
          content="A FFXIV search engine to look through all languages simultaneously."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.ico" />
        <meta
          property="og:image"
          content="https://moogle-search.vercel.app/favicon.png"
        />
        <meta name="theme-color" content="#447ae1" />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
