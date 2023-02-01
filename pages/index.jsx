import Head from "next/head";
import { useState } from "react";
import axios from "axios";

import { ItemCard } from "../components/ItemCard";
import { RadioGroup } from "@headlessui/react";

export default function Home() {
  const [keyword, setKeyword] = useState("Mog");
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [languageList, setLanguageList] = useState(["en", "de", "fr", "ja"]);
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const getResults = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("api/search/", {
        params: { keyword, languages: "en,de,fr,ja", page: 1 },
      });

      // Add the data to the results state
      console.log(data);

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
      <main className="w-full">
        <form
          className="sm:mx-auto mt-10 sm:w-full sm:flex flex-col items-center max-w-screen-sm "
          onSubmit={(e) => {
            getResults();
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <div className="flex w-full flex-row justify-center sm:justify-between">
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
                className="px-5 py-3 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 disabled:opacity-50"
                type="submit"
                disabled={loading}
              >
                Search
              </button>
            </div>
          </div>
          <RadioGroup
            value={currentLanguage}
            onChange={setCurrentLanguage}
            className="mt-4 flex flex-row justify-center sm:justify-between"
          >
            <RadioGroup.Label className="sr-only">Language</RadioGroup.Label>
            <div className="flex flex-row space-x-2">
              {languageList.map((language) => (
                <RadioGroup.Option key={language} value={language}>
                  {({ checked }) => (
                    <button
                      class={
                        "w-10 h-10 block mr-2 mb-2 text-xl font-mono font-bold text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" +
                        (checked
                          ? " underline underline-offset-4 decoration-2		"
                          : "")
                      }
                    >
                      {language.toUpperCase().charAt(0)}
                    </button>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </form>

        {loading && (
          // loading spinner
          <div className="mt-10 container mx-auto text-center font-semibold text-gray-500 flex justify-center">
            Loading... <span className="animate-spin ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><circle cx="256" cy="96" r="64" fill="currentColor"/><circle cx="96" cy="256" r="48" fill="currentColor"/><circle cx="368" cy="144" r="8" fill="currentColor"/><path d="M180.1 107.6c-19.9-20.1-52.2-20.1-72.1 0-19.9 20.1-19.9 52.7 0 72.8 19.9 20.1 52.2 20.1 72.1 0 19.9-20.1 19.9-52.7 0-72.8z" fill="currentColor"/><circle cx="416" cy="256" r="16" fill="currentColor"/><circle cx="369" cy="369" r="24" fill="currentColor"/><circle cx="256" cy="416" r="32" fill="currentColor"/><circle cx="144" cy="368" r="40" fill="currentColor"/></svg>
            </span>
          </div>
        ) }

        {(searchResults) ? (
          <div className="mt-10 container mx-auto">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 mx-auto p-4">
              {
                // If there are results, map the JSON to ItemCard components
                Object.entries(searchResults).map(([id, item]) => {
                  return (
                    <ItemCard
                      key={id}
                      id={id}
                      item={item}
                      currentLanguage={currentLanguage}
                      languageList={languageList}
                    />
                  );
                })
              }
            </div>
          </div>
        ) : (
          <div className="mt-10 container mx-auto text-center font-semibold text-gray-500">
            No results - did you check your spelling?
          </div>
        )}

        

      </main>
    </>
  );
}
