import { PAGES } from './constants'
import { fetchData } from './utils'
import { notFound } from './actions'
import { setPhotos } from './pages/gallery/actions'
import { setPhoto } from './pages/gallery-photo/actions'

const {
  HOME,
  ABOUT,
  GALLERY,
  GALLERY_PHOTO,
} = PAGES

export default {
  [HOME]: '/',
  [ABOUT]: '/about',
  [GALLERY]: {
    path: '/gallery',
    thunk: async (dispatch) => {
      const gallery = await fetchData('/gallery')
      dispatch(setPhotos(gallery))
    },
  },
  [GALLERY_PHOTO]: {
    path: '/gallery/:photo',
    thunk: async (dispatch, getState) => {
      const {
        location: { payload: { photo } },
      } = getState()
      const gallery = await fetchData('/gallery')
      const galleryPhoto = gallery[photo - 1]
      if (!galleryPhoto) dispatch(notFound())
      else dispatch(setPhoto(galleryPhoto))
    },
  },
}
