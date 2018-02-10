import React, { PureComponent } from 'react'
import { NavLink } from 'redux-first-router-link'

import styles from './styles'

export default class Gallery extends PureComponent {
  render() {
    const {
      photos,
    } = this.props

    return (
      <div>
        <h1>Gallery</h1>
        <ul className={styles.list}>
          { photos.map((item, index) =>
            <li
              className={styles.item}
              key={item + index}
            >
              <NavLink
                className={styles.link}
                to={`/gallery/${index + 1}`}
              >
                <img
                  className={styles.image}
                  src={item}
                  alt=""
                />
              </NavLink>
            </li>
          ) }
        </ul>
      </div>
    )
  }
}
