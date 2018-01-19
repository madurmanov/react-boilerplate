export const getState = state => state.app
export const getData = state => getState(state).data
export const getExample = state => getData(state).example
