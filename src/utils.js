export const fetchData = async (url, params = {}) =>
  fetch(`http://localhost:3000/api${url}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })
    .then(data => data.json())
    .then(data => data.response)

export const prepareActions = (actions, prefix) =>
  actions.reduce((acc, action) => ({
    ...acc,
    [action]: prefix ? `${prefix}/${action}` : action,
  }), {})
