export const fetchData = async (url, params = {}, form) =>
  fetch(`http://localhost:3000/api${url}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      ...(!form && {
        'Content-Type': 'application/json',
      }),
    },
    body: !form ? JSON.stringify(params) : params,
  })
    .then(data => data.json())
    .then(data => data.data)

export const prepareActions = (actions, prefix) =>
  actions.reduce((acc, action) => ({
    ...acc,
    [action]: prefix ? `${prefix}/${action}` : action,
  }), {})

export const classJoiner = (...args) => {
  const items = Array.isArray(args[0]) ? args[0] : args
  return items.filter(Boolean).join(' ')
}
