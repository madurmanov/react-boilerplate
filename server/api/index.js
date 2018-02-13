const fakeDelay = (ms = (Math.random() * 1000)) =>
  new Promise(res => setTimeout(res, ms))

const photos = new Array(12)
  .fill(0)
  .map(() => '/local/images/image.jpg')

const response = data => ({
  error: '',
  response: data,
})

// eslint-disable-next-line no-unused-vars
export default async (url, params = {}) => {
  await fakeDelay()
  switch (url) {
    case '/api/gallery':
      return response(photos)
    default:
      return []
  }
}
