import React from 'react'

import Header from '../Header'
import Switcher from '../Switcher'
import styles from './styles'

export default () =>
  <div className={styles.app}>
    <Header />
    <Switcher />
  </div>
