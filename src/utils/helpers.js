import stringify from 'json-stable-stringify'
import queryString from 'query-string'

export const urlEncode = (obj) => {
  const json = stringify(obj)
  return window.btoa(unescape(encodeURIComponent(json)))
}

export const urlDecode = (base64) => {
  try {
    return JSON.parse(decodeURIComponent(escape(window.atob(base64))))
  } catch (error) {
    return {}
  }
}

export const querySerializer = {
  parse: (string, options) => {
    const object = queryString.parse(string, options)
    if (object.q) {
      object.q = urlDecode(object.q)
    }
    return object
  },
  stringify: (object, options) => {
    const next = { ...object }
    if (next.q && typeof next.q === 'object') {
      next.q = urlEncode(next.q)
    } else {
      delete next.q
    }
    const string = queryString.stringify(next, options)
    return string
  },
  extract: string => queryString.extract(string),
}
