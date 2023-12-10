import './globals.css'
import moogleImg from '../public/search.png'
import Image from 'next/image';
import { Inter } from 'next/font/google'
import Head from "next/head";

import { Toaster } from 'react-hot-toast';


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
          content="https://moogle-search.vercel.app/public/favicon.png"
        />
        <link rel="apple-touch-icon" sizes="180x180" href="/public/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/public/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/public/favicon-16x16.png"/>
        <link rel="manifest" href="/public/site.webmanifest"></link>
        <meta name="theme-color" content="#f26793" />
      </Head>
      <body className={inter.className}>
        {children}
        <Toaster />
        <Image src={moogleImg} alt='' className='-bottom-10 -right-10 fixed z-0 grayscale max-h-full object-contain object-right mix-blend-luminosity opacity-10 dark:opacity-5 dark:invert' height={500} width={500} />
        </body>
    </html>
  )
}
