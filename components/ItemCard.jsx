import Image from "next/image";
import axios from "axios";
import { useState, useEffect } from "react";
import { clearPreviewData } from "next/dist/server/api-utils";

export function ItemCard({ id, item }) {
  /* Gather info based on the item ID using https://xivapi.com/item/id */

  const [additionalInfo, setadditionalInfo] = useState();

  useEffect(() => {
    // declare the data fetching function
    const getInfo = async () => {
      const { data } = await axios.get("https://xivapi.com/item/" + id);
      console.log(data);
      setadditionalInfo(data);
    };

    // call the function
    getInfo().catch((err) => {
      console.log(err);
    });
  }, [id]);

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg px-6 py-4">
      <div className="flex">
        {additionalInfo ? (
          <Image
            src={"https://xivapi.com" + additionalInfo["Icon"]}
            alt={item["en"]}
            width={50}
            height={50}
            className="rounded-t w-10 h-10 "
          />
        ) : (
          <div className="rounded-t w-10 h-10 bg-gray-600 animate-pulse"></div>
        )}
        <div className="font-bold text-xl ml-2 mb-2 leading-none">
          {item["en"]}
        </div>
      </div>
      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 tracking-wide	">
        ITEM LEVEL {additionalInfo ? additionalInfo["LevelItem"] : "..."}
      </span>
      <div className="">
        <p className="text-gray-700 text-sm"> {item["de"]}</p>
        <p className="text-gray-700 text-sm"> {item["fr"]}</p>
        <p className="text-gray-700 text-sm"> {item["ja"]}</p>
      </div>
      <div className="">
        <a
          href={"https://garlandtools.org/db/#item/" + id}
          className="text-blue-500 text-sm"
          target="_blank"
          rel="noreferrer"
        >
          Garland Tools
        </a>
      </div>
    </div>
  );
}
