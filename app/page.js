"use client";

import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import axios from "axios";
import { RadioGroup } from "@headlessui/react";
import { ItemCard } from '@/components/ItemCard';

import errorMoogle from '../public/ko.png'


export default function Home() {
  "use client";

  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [languageList, setLanguageList] = useState(["en", "de", "fr", "ja"]);
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchParam, setSearchParam] = useState('');



  const handleInputChange = async (e) => {
    // Set the search param state
    const newSearchParam = e.target.value;
    setSearchParam(newSearchParam);

    // Update the URL
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('search', newSearchParam);
    window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`);

    // Search for the new value
    getResults(e.target.value);
  };


  const getResults = async (searchParam) => {
    setLoading(true);

    try {
      const { data } = await axios.get("api/search", {
        params: { query: searchParam, languages: "en,de,fr,ja", page: 1 },
      });

      setSearchResults(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  // load the search param from the URL on page load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchValue = urlParams.get('search');
    setSearchParam(searchValue || '');
    getResults(searchValue);
  }, []);


  function SearchResults({ results }) {
    if (loading) {
      return (
        <div className="mt-10 container mx-auto text-center font-semibold text-zinc-500 w-full">
          Loading...
        </div>
      );
    } else if (!results || results == null || Object.keys(results).length === 0) {
      return (
        <div className="mt-10 container mx-auto text-center font-semibold text-zinc-500 w-full">
          No results - did you check your spelling?
          <Image src={errorMoogle} alt='' className='dark:brightness-75 mx-auto mt-10 max-w-full' height={500} width={500} />
        </div>
      );
    } else if (typeof results !== 'object') {
      // if results is not a JSON object, then it's an error
      <div className="mt-10 container mx-auto text-center font-semibold text-zinc-500 w-full">
        Error loading results: {results.error}
      </div>
    }
    else if (typeof results === 'object' && Object.keys(results).length > 0) {
      return (<div className="mt-10 container mx-auto">
        {/* center text with number of results */}
        <div className="text-center font-semibold text-zinc-500">
          {Object.keys(results).length} results
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 mx-auto p-4">
          {
            Object.entries(searchResults).map(([id, item]) => (
              <ItemCard
                key={id}
                id={id}
                item={item}
                currentLanguage={currentLanguage}
                languageList={languageList}
              />
            ))
          }
        </div>
      </div>);
    } else {
      <div className="mt-10 container mx-auto text-center font-semibold text-zinc-500">
        No results - did you check your spelling?
      </div>
    }
  }

  return (
    <main className="w-full">
      <form
        className="sm:mx-auto mt-10 sm:w-full sm:flex flex-col items-center max-w-screen-sm "
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex w-full flex-row ">
          <input
            type="text"
            className="w-full px-5 py-3 text-zinc-700 bg-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:border-transparent"
            placeholder="Search..."
            defaultValue={searchParam}
            onChange={handleInputChange}
          />
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
                    className={
                      "w-10 h-10 block mr-2 mb-2 text-xl font-mono font-bold text-zinc-900 focus:outline-none bg-white rounded-lg border border-zinc-200 hover:bg-zinc-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-zinc-200 dark:focus:ring-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-600 dark:hover:text-white dark:hover:bg-zinc-700" +
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
      <SearchResults results={searchResults} />
    </main>
  )
}
