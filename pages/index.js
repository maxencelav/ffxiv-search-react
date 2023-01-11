import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Moogle Search</title>
        <meta name="description" content="aou" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        

        <div className="flex flex-col items-center justify-center min-h-screen py-2"><h1 className="text-4xl font-bold">Moogle Search</h1>
        <p className="text-xl">aou</p>
            <input className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" />
            <button className="px-4 py-2 mt-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">Search</button>
        </div>

      </main>
    </>
  )
}
