// pages/api/search.js

export default async function handler(req, res) {
  // Get the search query
  console.log(req.query)
  const { keyword, languages } = req.query

  // get the items located at /data/items.json
  const items = await import('../../data/items.json')

  // split the languages string into an array
  const languagesArray = languages.split(',')

  // Filter the items object by the search query
  /* const filteredItems = Object.entries(items).filter(([id, item]) => {
      // Check if the item name in either selected languages contains the search query
      const isMatch = languagesArray.some((language) => {
        if (item[language]) {
          return item[language].toLowerCase().includes(keyword.toLowerCase())
        } else {
          return false
        }
      })

    return isMatch
  })*/

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


  // Return the filtered items as an array
  res.status(200).json(filteredItems)

}