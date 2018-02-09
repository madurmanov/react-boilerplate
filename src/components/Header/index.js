import React from 'react'
import { NavLink } from 'redux-first-router-link'

import styles from './styles'

const nav = [
  {
    to: '/about',
    name: 'About',
  },
  {
    to: '/gallery',
    name: 'Gallery',
  },
  {
    to: '/admin',
    name: 'Admin',
  },
  {
    to: '/login',
    name: 'Login',
  },
]

export default () =>
  <header className={styles.header}>
    <NavLink
      className={styles.logo}
      to="/"
    >
      Logo
    </NavLink>
    <nav className={styles.nav}>
      { nav.map(item =>
        <NavLink
          key={item.name}
          className={styles.navItem}
          to={item.to}
        >
          {item.name}
        </NavLink>
      ) }
    </nav>
  </header>
