import fetch from 'isomorphic-fetch'
import {includes} from 'lodash/fp'

const deserialize = async response => {
  const header = response.headers.get('Content-Type')
  return includes('application/json', header)
    ? response.json()
    : response.text()
}

export const fetchJson = async (url) => {
  const response = await fetch(url)
  const body = await deserialize(response)
  return body
}
