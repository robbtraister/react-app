import React from 'react'
import ReactDOM from 'react-dom'
import { StaticRouter } from 'react-router'

import { App } from '~/app'

import pages from '~/app/pages'

const location = document
  .getElementsByName('location')?.[0]
  .attributes.find(att => att.name === 'value').value

setTimeout(() => {
  ReactDOM.render(
    <StaticRouter location={location}>
      <App pages={pages} />
    </StaticRouter>,
    document.getElementById('root')
  )
}, 0)
