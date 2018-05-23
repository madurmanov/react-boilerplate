const origin = typeof window !== 'undefined' && window.location.origin

export const fetchData = async (url, params = {}, form) => {
  try {
    return fetch(`${origin}/api${url}`, {
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        ...(!form && { 'Content-Type': 'application/json' }),
      },
      body: !form ? JSON.stringify(params) : params,
    }).then(data => data.json())
  } catch (err) {
    return {
      data: undefined,
      error: 'В момент загрузки данных произошла ошибка',
    }
  }
}
