export const getState = state => state.example
export const getData = state => getState(state).data
export const getExample = state => getData(state).example
