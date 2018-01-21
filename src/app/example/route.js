import React from 'react'

import { store, reducers } from 'src/client/app'

export default () => {
  const component = require('./').default
  store.replaceReducer(reducers({ example: component.reducer }))
  store.dispatch(component.actions.init())
  return <component.container />
}
