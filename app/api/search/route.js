import { NextResponse } from 'next/server';




export async function GET(request) {
  console.log('search route');
  // return new NextResponse.json("Hello World");

  try {
    // Get the search query
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const languages = searchParams.get('languages');
    const page = searchParams.get('page');

    console.log(query);
    console.log(languages);
    console.log(page);

  // get the items located at /data/items.json
  const items = await import('.//../../../data/items.json')

    // split the languages string into an array
    const languagesArray = languages.split(',')

    const filteredItems = Object.fromEntries(Object.entries(items).filter(([id, item]) => {
      // Check if the item name in either selected languages contains the search query
      return languagesArray.some((language) => {
        if (item[language]) {
          return item[language].toLowerCase().includes(query.toLowerCase())
        } else {
          return false
        }
      })
    }))

    // Split it into pages of 20 items
    const pageItems = Object.fromEntries(Object.entries(filteredItems).slice((page - 1) * 20, page * 20))

    // Return the filtered items as an array
    return NextResponse.json(pageItems )
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message })
  }
}