export const classJoiner = (...args) => {
  const items = Array.isArray(args[0]) ? args[0] : args
  return items.filter(Boolean).join(' ')
}
