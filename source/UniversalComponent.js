import React from 'react' // eslint-disable-line
import PropTypes from 'prop-types'
import universal from 'react-universal-component'
import Loading from './components/Loading'
import Error404 from './components/Error404'

const UniversalComponent = universal(
  ({ page }) => (typeof page !== 'string' ? () => page() : import(`./${page}`)),
  {
    onError: error => {
      throw error
    },
    minDelay: 1200,
    loading: Loading,
    error: Error404,
  }
)

UniversalComponent.propTypes = {
  loading: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
    PropTypes.bool,
  ]),
  error: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
    PropTypes.bool,
  ]),
  key: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  timeout: PropTypes.number,
  onError: PropTypes.func,
  onLoad: PropTypes.func,
  minDelay: PropTypes.number,
  alwaysDelay: PropTypes.bool,
  loadingTransition: PropTypes.bool,
}

export default UniversalComponent
