import FormData from 'form-data'

export const constants = (arr, prefix) =>
  arr.reduce((acc, item) => ({
    ...acc,
    [item]: prefix ? `${prefix}/${item}` : item,
  }), {})

export const formData = params => {
  const data = new FormData()
  Object.keys(params).forEach(key => {
    data.append([key], params[key])
  })
  return data
}
