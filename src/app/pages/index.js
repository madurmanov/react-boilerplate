import universal from 'react-universal-component'
import { combineReducers } from 'redux'
import { connect } from 'react-redux'

import { getRoute } from 'src/app/selectors'
import Loading from 'src/app/components/loading'

export default ({ store, reducers }) => {
  // eslint-disable-next-line
  const onLoad = (moduleObject, _, { modulePath }) => {
    const route = (moduleObject.constants || {}).STORE_KEY

    if (route && moduleObject.reducer) {
      // eslint-disable-next-line
      reducers[route] = moduleObject.reducer
    }

    const resultReducer = combineReducers({ ...reducers })
    store.replaceReducer(resultReducer)

    if (moduleObject.actions && moduleObject.actions.init) {
      store.dispatch(moduleObject.actions.init())
    }
  }

  const UniversalComponent = universal(
    (props) => { return import(`./${props.modulePath}`) }, { onLoad, Loading }
  )

  const mapStateToProps = (state) => {
    const { modulePath } = getRoute(state)

    return {
      modulePath,
    }
  }

  return connect(mapStateToProps)(UniversalComponent)
}
