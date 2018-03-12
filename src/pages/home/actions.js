import { fetchData } from 'src/utils'
import { ACTIONS } from './constants'

const {
  CHANGE_NAME,
  CHANGE_APP_NAME,
} = ACTIONS

export const changeName = value => ({
  type: CHANGE_NAME,
  value,
})

export const changeAppName = value => ({
  type: CHANGE_APP_NAME,
  value,
})

export const fetchAppName = () => async (dispatch) => {
  const data = await fetchData('/getAppName')
  return dispatch(changeAppName(data.appName))
}
