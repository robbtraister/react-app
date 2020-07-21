import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import { App } from '~/app'

import pages from '~/app/pages'

function render() {
  ReactDOM.render(
    <BrowserRouter>
      <App pages={pages} />
    </BrowserRouter>,
    document.getElementById('root')
  )
}

document.addEventListener('DOMContentLoaded', render)
