import React from 'react'
import Link from 'redux-first-router-link'
import UniversalComponent from '../UniversalComponent'

export default class App extends React.PureComponent {
  render() {
    const { page } = this.props

    return (
      <div>
        <nav>
          <Link to="/">
            Home
          </Link>
          <Link to="/about">
            About
          </Link>
        </nav>
        <UniversalComponent page={`components/${page}`} />
      </div>
    )
  }
}
