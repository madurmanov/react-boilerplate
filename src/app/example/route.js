import React from 'react'
import { injectAsyncReducer } from 'src/app/store'

export default () => {
  const component = require('./').default
  injectAsyncReducer('example', component.reducer)
  return <component.container />
}
