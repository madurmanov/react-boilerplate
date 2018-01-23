import example from './example'

const ajax = (cb, response) => {
  setTimeout(() => {
    cb({
      error: false,
      response,
    })
  }, (Math.random() + 1) * 750)
}

const api = {
  // eslint-disable-next-line
  call(method, params = {}, _cb) {
    const cb = response => {
      ajax(_cb, response)
      return { fail: () => {} }
    }
    switch (method) {
      case 'example':
        return cb(example)
      default:
        return cb({})
    }
  },
}

export default api
