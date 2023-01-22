import Head from "next/head";
import { useState } from "react";
import axios from "axios";

import {ItemCard} from "../components/ItemCard";


export default function Home() {
  const [keyword, setKeyword] = useState("Mog");
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const getResults = async () => {
    try {
      const { data } = await axios.get("api/search/", {
        params: { keyword, languages: "en,de,fr,ja" },
      })

      // Add the data to the results state
      setSearchResults(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Moogle Search</title>
        <meta name="description" content="aou" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <form
            className="sm:mx-auto mt-10 justify-center sm:w-full sm:flex max-w-screen-sm"
            onSubmit={(e) => {
              getResults();
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <input
              type="text"
              className="w-full px-5 py-3 text-gray-700 bg-gray-200 rounded"
              placeholder="Search..."
              defaultValue={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
                setSearchResults(null);
              }}
            />
            <div className="mt-4 sm:mt-0 sm:ml-3">
              <button
                className="px-5 py-3 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                type="submit"
              >
                Search
              </button>
            </div>
          </form>

          {searchResults && (
          <div className="mt-10">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-3">
              { // If there are results, map the JSON to ItemCard components
                Object.entries(searchResults).map(([id, item]) => {
                  return (
                    <ItemCard key={id} id={id} item={item} />
                  )
                }
              )}
            </div>
          </div>
        )}
        </div>
        
      </main>
    </>
  );
}
