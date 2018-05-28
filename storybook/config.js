import React from 'react'
import { configure, storiesOf } from '@storybook/react'

const componentsContext = require.context(
  '../source/components',
  true,
  /(.*)index\.js$/
)

const storiesContext = require.context(
  './stories',
  true,
  /(.*).js$/
)

const prepareStories = storiesContext.keys()
  .map(path => [path, path.slice(2, -3)])
const prepareComponents = componentsContext.keys()
  .map(path => [path, path.slice(2, -9)])
  .map(([file, folder]) => ({
    name: folder,
    component: componentsContext(file),
    story: prepareStories.find(([, f]) => f === folder) || null,
  }))
  .filter(({ name }) => name)

const loadStories = () => {
  prepareComponents.forEach(({ name, component, story }) => {
    const stories = storiesOf(name, module)
    if (story) {
      storiesContext(story[0]).default
        .forEach(([state, props]) => {
          stories.add(state, () => <component.default {...props} />)
        })
    }
  })
}

configure(loadStories, module)
