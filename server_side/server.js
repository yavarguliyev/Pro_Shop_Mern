import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorHandler.js'
import connectDB from './config/db.js'

import crypto from 'crypto';

import helmet from 'helmet'
import xss from 'xss-clean'
import hpp from 'hpp'
import cors from 'cors'

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

const trusted = [
  "'self'",
];

const nonce = crypto.randomBytes(16).toString('hex');

export default function contentSecurityPolicy(nonce) {
  return helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: trusted,
      scriptSrc: [
        "'unsafe-eval'",
        "'unsafe-inline'",
        `nonce-${nonce}`,
        'https://www.googletagmanager.com',
        '*.googletagmanager.com',
      ].concat(trusted),
      styleSrc: [
        "'unsafe-inline'",
        '*.gstatic.com',
        '*.googleapis.com',
        'https://*.typography.com',
      ].concat(trusted),
      frameSrc: [
        '*.stripe.com',
        '*.paypal.com',
      ].concat(trusted),
      fontSrc: [
        '*.cloudflare.com',
        'https://*.cloudflare.com',
        '*.bootstrapcdn.com',
        '*.googleapis.com',
        '*.gstatic.com',
        'data',
      ].concat(trusted),
      imgSrc: [
        'www.googletagmanager.com',
      ].concat(trusted),
    },
    reportOnly: false,
    setAllHeaders: false,
    safari5: false
  });
};

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "script-src": ["'self'", "'unsafe-inline'", "example.com"],
      },
    },
  })
);
// app.use(helmet.referrerPolicy({ policy: 'same-origin' }));
// app.use(contentSecurityPolicy(nonce));

app.use(xss())
app.use(hpp())
app.use(cors())

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
