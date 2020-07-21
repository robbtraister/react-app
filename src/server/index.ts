import express from 'express'

import api from './api'
import render from './render'
import errors from './errors'

export function app() {
  const app = express()

  app.disable('x-powered-by')

  app.use('/api', api)
  app.use(render)
  app.use(errors)

  return app
}

export function server(port = undefined) {
  const server = app()
  server.listen(Number(port || process.env.PORT) || 3000, err => {
    err ? console.error(err) : console.log(`Listening at: ${server.address()}`)
  })
}

export default server

// eslint-disable-next-line no-eval
if (eval('module === require.main')) {
  server()
}
