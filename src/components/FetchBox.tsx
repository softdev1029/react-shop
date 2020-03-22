/**
 * https://www.robinwieruch.de/react-hooks-fetch-data
 */
import * as React from "react"
import { useState, useEffect } from "react"
import axios from "axios"

type Item = {
  objectID: string
  url: string
  title: string
}

export function FetchBox() {
  const [data, setData] = useState({ hits: [] })
  const [query, setQuery] = useState("redux")
  const [url, setUrl] = useState(
    "https://hn.algolia.com/api/v1/search?query=redux"
  )
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false)
      setIsLoading(true)
      try {
        const res = await axios(url)
        setData(res.data)
      } catch (e) {
        setIsError(true)
      }
      setIsLoading(false)
    }
    fetchData()
  }, [url])
  return (
    <>
      {isError && <div>Something went wrong ...</div>}
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <form
            onSubmit={e => {
              setUrl(`http://hn.algolia.com/api/v1/search?query=${query}`)
              e.preventDefault()
            }}
          >
            <input
              type="text"
              value={query}
              onChange={event => setQuery(event.target.value)}
            />
            <button type="submit">Search</button>
          </form>
          <ul>
            {data.hits.map((item: Item) => (
              <li key={item.objectID}>
                <a href={item.url}>{item.title}</a>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  )
}
