import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorHandler.js'
import connectDB from './config/db.js'

import helmet from 'helmet';
import xss from 'xss-clean';
import hpp from 'hpp';
import cors from 'cors';

import product from './routes/product.js'
import user from './routes/user.js'
import order from './routes/order.js'
import upload from './routes/upload.js'

dotenv.config()

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      scriptSrc: ["'self'", 'sha256-B3MPZ7fxjq80aegu65aic5wxFr1yyoaon4GbVVFTt/U='],
      imgSrc: ["'self'", 'http://www.w3.org/2000/svg'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com', 'https://cdnjs.cloudflare.com/'],
      styleSrc: ["'self'", 'https://fonts.googleapis.com'],
      defaultSrc: ["'self'"],
      connectSrc: ["'self'"],
      frameSrc: ["'self'"],
      childSrc: ["'self'"],
      baseUri: ["'self'"],
    },
    reportOnly: true
  }
}))

app.use(xss())

app.use(hpp());

app.use(cors());

app.use('/api/v1/products', product)
app.use('/api/v1/users', user)
app.use('/api/v1/orders', order)
app.use('/api/v1/upload', upload)

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client_side/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client_side', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
