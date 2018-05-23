import React from 'react'
import { configure, storiesOf } from '@storybook/react'

const components = require.context(
  '../source/components',
  true,
  /(.*)index\.js$/
)

const previews = require.context(
  '../source/components',
  true,
  /(.*)index\.preview\.js$/
)

const storiesPreviews = previews.keys()
  .map(path => [path, path.slice(2, -17)])
const stories = components.keys()
  .map(path => [path, path.slice(2, -9)])
  .map(([file, folder]) => ({
    name: folder,
    component: components(file),
    preview: storiesPreviews.find(([, f]) => f === folder) || null,
  }))
  .filter(({ name }) => name)

const loadStories = () => {
  stories.forEach(({ name, component, preview }) => {
    const story = storiesOf(name, module)
    if (preview) {
      previews(preview[0]).default
        .forEach(([state, props]) => {
          story.add(state, () => <component.default {...props} />)
        })
    }
  })
}

configure(loadStories, module)
