export default (actions, prefix) => {
  return actions.reduce((acc, action) => ({
    ...acc,
    [action]: `${prefix}/${action}`,
  }), {})
}
