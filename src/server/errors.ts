// import express from 'express'

export class RedirectError extends Error {
  location: string
  statusCode: number

  constructor(location: string, statusCode = 302) {
    super(`Redirect: ${location}`)
    this.location = location
    this.statusCode = statusCode
  }
}

export default [
  (err, req, res, next) => {
    if (
      err.location &&
      err.statusCode &&
      err.statusCode >= 300 &&
      err.statusCode < 400
    ) {
      res.redirect(err.location)
    } else {
      next(err)
    }
  },
  (_err, req, res, next) => {
    res.sendStatus(500)
  }
]
