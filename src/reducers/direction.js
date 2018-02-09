export default (state = 'next', action = {}) => {
  if (!action.meta || !action.meta.location) {
    return state
  }

  const { type } = action
  const prevType = action.meta.location.prev.type

  if (type === prevType) {
    return state
  }

  if (type === 'HOME' || type === 'LOGIN') {
    return 'back'
  }

  return 'next'
}
