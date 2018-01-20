import React from 'react'
import { Route } from 'react-router-dom'

import Example from 'src/app/example/route'

export default () => (
  <div>
    <Route path="/example" component={Example} />
  </div>
)
