const express = require('express');
const apiRouter = express.Router();
const jwt = require('jsonwebtoken');
const { getUserByEmail } = require('../db');
const { JWT_SECRET } = process.env;

const volleyball = require('volleyball')
apiRouter.use(volleyball)

// set `req.user` if possible
apiRouter.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');

  if (!auth) { // nothing to see here
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const parsedToken = jwt.verify(token, JWT_SECRET);
      const email = parsedToken && parsedToken.email

      if (email) {
        req.user = await getUserByEmail(email);
        next();
      }
    } catch (error) {
      next(error);
    }
  } else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with ${prefix}`
    });
  }
});

apiRouter.use((req, res, next) => {
  if (req.user) {
    console.log("User is set:", req.user);
  }
  next();
});

const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

const productsRouter = require('./products');
apiRouter.use('/products', productsRouter);

apiRouter.use((err, req, res, next) => {
  res.status(500).send(err)
})

module.exports = apiRouter;