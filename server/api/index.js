const fakeDelay = (ms = (Math.random() * 1000)) =>
  new Promise(res => setTimeout(res, ms))

const photos = new Array(12)
  .fill(0)
  .map(() => '/local/images/image.jpg')

export default async (req, token) => {
  await fakeDelay()
  if (!token) return []
  switch (req.url) {
    case '/api/gallery':
      return photos
    default:
      return []
  }
}
