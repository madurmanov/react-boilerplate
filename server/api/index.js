const fakeDelay = (ms = (Math.random() * 1000)) =>
  new Promise(res => setTimeout(res, ms))

const photos = new Array(12)
  .fill(0)
  .map(() => 'https://yandex.ru/images/today')

export default async (req, jwToken) => {
  await fakeDelay()
  if (!jwToken) return []
  switch (req.url) {
    case '/api/gallery':
      return photos
    default:
      return []
  }
}
