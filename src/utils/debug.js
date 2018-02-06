export default (dirname) => {
  return require('debug')(`app:${dirname.replace(/\//g, ':')}`)
}
