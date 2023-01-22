// pages/api/search.js

export default async function handler(req, res) {
  // Get the search query
  console.log(req.query)
  const { keyword, languages, page } = req.query

  // get the items located at /data/items.json
  const items = await import('../../data/items.json')

  // split the languages string into an array
  const languagesArray = languages.split(',')

  const filteredItems = Object.fromEntries(Object.entries(items).filter(([id, item]) => {
    // Check if the item name in either selected languages contains the search query
    return languagesArray.some((language) => {
      if (item[language]) {
        return item[language].toLowerCase().includes(keyword.toLowerCase())
      } else {
        return false
      }
    })
  }))

  // Split it into pages of 20 items
  const pageItems =  Object.fromEntries(Object.entries(filteredItems).slice((page - 1) * 20, page * 20))

  // Return the filtered items as an array
  res.status(200).json(pageItems)

}