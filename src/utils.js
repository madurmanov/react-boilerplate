import routesMap from './routes'

export const isServer = typeof window === 'undefined'

const fakeUser = { roles: ['admin'] }
const userFromState = ({ jwToken }) => jwToken === 'real' && fakeUser
const jwt = {
  verify: jwToken => jwToken === 'real' && fakeUser,
}

export const isAllowed = (type, state) => {
  const role = routesMap[type] && routesMap[type].role
  if (!role) return true

  const user = isServer
    ? jwt.verify(state.jwToken, process.env.JWT_SECRET)
    : userFromState(state)

  if (!user) return false

  return user.roles.includes(role)
}
