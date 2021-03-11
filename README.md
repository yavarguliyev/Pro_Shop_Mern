# ProShop eCommerce Platform

> eCommerce platform built with the MERN stack & Redux.

This is the course project for my [MERN eCommerce From Scratch](https://github.com/yavarguliyev/Pro_Shop_Mern) course

# Features

- Full featured shopping cart
- Product reviews and ratings
- Top products carousel
- Product pagination
- Product search feature
- User profile with orders
- Admin product management
- Admin user management
- Admin Order details page
- Mark orders as delivered option
- Checkout process (shipping, payment method, etc)
- PayPal / credit card integration
- Database seeder (products & users)

# Usage

## ES Modules in Node

We us ECMAScript Modules in the backend in this project. Be sure to have at least Node v14.6+ or you will need to add the "--experimental-modules" flag.

Also, when importing a file (not a package), be sure to add .js at the end or you will get a "module not found" error

You can also install and setup Babel if you would like

## Env Variables

Create a .env file in then root and add the following

```javascript
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'
PAYPAL_CLIENT_ID = your paypal client id
```

## Install Dependencies (client_side & server_side)

```javascript
npm install
cd frontend
npm install
```

## Run

```javascript
# Run client_side (:3000) & server_side (:5000)
npm run dev

# Run backend only
npm run server
```

## Seed Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data

```javascript
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```

```javascript
Sample User Logins

admin@example.com (Admin)
123456

john@example.com (Customer)
123456

jane@example.com (Customer)
123456
```

You can also check out the [api documentation](https://documenter.getpostman.com/view/11043766/TW6xo823)

# License

The MIT License

Copyright (c) 2020 Yavar Guliyev

[README cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)

## Publish The Project in Heroku via Terminal

```
heroku login
heroku create ...

after create Procfile in the route file and add this text to there:

- web: node server_side/server.js

- after configure this line to the package.json --- "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client_side && npm run build --prefix client_side"

- after push repo to git

- after add this command to terminal --- 'heroku git:remote -a firstapppro'

- after push repo like this --- git push heroku main

- heroku logs - check for the errors

- go to the settings in heroku --- 'Config Vars':

--- key - NODE_ENV  --- value - production
--- key - PORT  --- value - 5000
and rest check out from .env file
```
