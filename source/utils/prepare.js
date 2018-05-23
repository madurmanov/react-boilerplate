import FormData from 'form-data'

export const prepareConstants = (constants, prefix) =>
  constants.reduce((acc, constant) => ({
    ...acc,
    [constant]: prefix ? `${prefix}/${constant}` : constant,
  }), {})

export const prepareFormData = params => {
  const data = new FormData()
  Object.keys(params).forEach(key => {
    data.append([key], params[key])
  })
  return data
}
