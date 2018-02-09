import React from 'react'
import { TransitionGroup, Transition } from 'transition-group'
import universal from 'react-universal-component'

import Error from './Error'
import Loading from './Loading'
import Header from './Header'
import styles from './styles'

const UniversalComponent = universal(({ page }) => import(`../pages/${page}`), {
  minDelay: 500,
  loading: Loading,
  error: Error,
})

export default ({ page, direction }) =>
  <div className={styles.app}>
    <Header />
    <TransitionGroup
      className={`${styles.switcher} ${direction}`}
      duration={500}
      prefix="loading"
    >
      <Transition key={page}>
        <UniversalComponent page={page} />
      </Transition>
    </TransitionGroup>
  </div>
