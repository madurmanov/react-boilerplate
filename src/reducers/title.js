export default (state = 'App', action = {}) => {
  switch (action.type) {
    case 'HOME':
      return 'Home'
    case 'ABOUT':
      return 'About'
    case 'GALLERY':
      return 'Gallery'
    case 'LOGIN':
      return 'Login'
    case 'ADMIN':
      return 'Admin'
    default:
      return state
  }
}
