import React, { PureComponent } from 'react'

import styles from './styles'

export default class GalleryPhoto extends PureComponent {
  render() {
    const {
      photo,
    } = this.props

    return (
      <div>
        <h1>GalleryPhoto</h1>
        <img
          className={styles.image}
          src={photo}
          alt=""
        />
      </div>
    )
  }
}
