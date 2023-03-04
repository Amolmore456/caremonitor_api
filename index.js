

import express from 'express'
import dotenv from 'dotenv'

import heartBeatRoutes from './routes/heartBeatRoutes.js'

dotenv.config()
const app = express()

app.use(express.json({limit:'50mb'}))

app.use('/api/heartbeat', heartBeatRoutes)




app.get('/', (req, res) => {
  res.send('Api is running....')
})

app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
})

const PORT = process.env.PORT || 8000
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} on ${PORT}`)
)