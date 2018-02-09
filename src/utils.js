import routesMap from './routes'

const fakeUser = { roles: ['admin'] }
const userFromState = ({ jwToken }) => jwToken === 'real' && fakeUser
const jwt = {
  verify: jwToken => jwToken === 'real' && fakeUser,
}

export const isServer = typeof window === 'undefined'

export const fetchData = async (path, jwToken) =>
  fetch(`http://localhost:3000${path}`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${jwToken || ''}`,
    },
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
    ? jwt.verify(state.jwToken, process.env.JWT_SECRET)
    : userFromState(state)

  if (!user) return false

  return user.roles.includes(role)
}
