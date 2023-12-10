import { NextResponse } from 'next/server';

let cache = null;

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const query = request.nextUrl.searchParams.get('query');
    const languages = request.nextUrl.searchParams.get('languages');
    let page = request.nextUrl.searchParams.get('page');

    if (!cache) {
      cache = await import('.//../../../data/items.json');
    }
    const items = cache;


    let languagesArray = [];
    if (languages) {
      languagesArray = languages.split(',')
    }

    const filteredItems = Object.fromEntries(Object.entries(items).filter(([id, item]) => {
      return languagesArray.some((language) => {
        if (item[language]) {
          return item[language].toLowerCase().includes(query ? query.toLowerCase() : '')
        } else {
          return false
        }
      })
    }))

    if (!page || isNaN(page)) {
      page = 1;
    }

    const pageItems = Object.fromEntries(Object.entries(filteredItems).slice((page - 1) * 20, page * 20))

    return NextResponse.json(pageItems)
  } catch (error) {
    console.log('Error loading search results in!', error)
    return new NextResponse(500, { error: 'Internal Server Error' })
  }
}