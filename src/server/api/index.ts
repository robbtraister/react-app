import express from 'express'

const router = express()

router.use((req, res, next) => {
  res.sendStatus(404)
})

export default router
