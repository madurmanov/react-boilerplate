import { create } from 'src/utils/functions'

const emptyObj = {}

export const getState = state => state.app
export const getLocation = state => state.location || { routesMap: {} }
export const getRoute = create(
  getLocation,
  ({ type, routesMap }) => routesMap[type] || emptyObj
)
