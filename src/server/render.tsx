import fs from 'fs'
import path from 'path'

import React from 'react'
import ReactDOM from 'react-dom/server'
import { StaticRouter } from 'react-router'

import { RedirectError } from './errors'

import { App } from '~/app'
import pages from '~/app/pages'

export async function render({ format = 'html', location }) {
  const page =
    location
      .replace(/[?&#].+/, '')
      .replace(/^\/+/, '')
      .split('/')[0] || 'dashboard'

  const [{ default: Format }] = await Promise.all([
    import(`../formats/${format}`)
  ])

  const style =
    format === 'amp'
      ? (
          await fs.promises.readFile(
            // eslint-disable-next-line no-eval
            path.join('.', 'build', 'dist', `styles.css`)
          )
        ).toString()
      : null

  const context: { url?: string } = {}

  const html = ReactDOM.renderToString(
    <StaticRouter context={context} location={location}>
      <Format page={page} style={style}>
        <App pages={pages} />
      </Format>
    </StaticRouter>
  )

  if (context.url) {
    throw new RedirectError(context.url)
  }

  return html
}

export default async function (req, res, next) {
  try {
    res.send(
      `<!DOCTYPE html>${await render({
        location: req.originalUrl,
        format: req.query.format
      })}`
    )
  } catch (error) {
    next(error)
  }
}
