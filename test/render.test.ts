import request from 'supertest'

import { app } from '~/server'

describe('Render', () => {
  it('redirect root', () => {
    return request(app()).get('/').expect(302).expect('Location', '/home')
  })

  it('render home', () => {
    return request(app())
      .get('/home')
      .expect('Content-Type', /^text\/html(;|$)/)
      .then(response => {
        expect(response.text).toMatchSnapshot()
      })
  })

  it('render home in amp', () => {
    return request(app())
      .get('/home?format=amp')
      .expect('Content-Type', /^text\/html(;|$)/)
      .then(response => {
        expect(response.text).toMatchSnapshot()
      })
  })
})
