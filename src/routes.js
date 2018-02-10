import { fetchData } from './utils'
import { notFound } from './actions'
import { setPhotos } from './pages/gallery/actions'
import { setPhoto } from './pages/gallery-photo/actions'

export default {
  HOME: '/',
  ABOUT: '/about',
  GALLERY: {
    path: '/gallery',
    thunk: async (dispatch, getState) => {
      const {
        jwToken,
      } = getState()
      const gallery = await fetchData('/gallery', jwToken)
      dispatch(setPhotos(gallery))
    },
  },
  GALLERY_PHOTO: {
    path: '/gallery/:photo',
    thunk: async (dispatch, getState) => {
      const {
        jwToken,
        location: { payload: { photo } },
      } = getState()
      const gallery = await fetchData('/gallery', jwToken)
      const galleryPhoto = gallery[photo - 1]
      if (!galleryPhoto) dispatch(notFound())
      else dispatch(setPhoto(galleryPhoto))
    },
  },
  LOGIN: '/login',
  ADMIN: {
    path: '/admin',
    role: 'admin',
  },
}
