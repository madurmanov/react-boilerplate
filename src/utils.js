import routesMap from './routes'

const fakeUser = { roles: ['admin'] }
const userFromState = ({ token }) => token === 'real' && fakeUser
const jwt = {
  verify: token => token === 'real' && fakeUser,
}

export const isServer = typeof window === 'undefined'

export const fetchData = async (url, token) =>
  fetch(`http://localhost:3000/api${url}`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token || ''}`,
    },
    cache: 'no-cache',
  }).then(data => data.json())

export const prepareActions = (actions, prefix) =>
  actions.reduce((acc, action) => ({
    ...acc,
    [action]: prefix ? `${prefix}/${action}` : action,
  }), {})

export const isAllowed = (type, state) => {
  const role = routesMap[type] && routesMap[type].role
  if (!role) return true

  const user = isServer
    ? jwt.verify(state.token, process.env.JWT_SECRET)
    : userFromState(state)

  if (!user) return false

  return user.roles.includes(role)
}
