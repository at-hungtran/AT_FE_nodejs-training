const express = require('express');
const routes = require('../routes');
const bodyParser = require('body-parser');
const HttpStatus = require('http-status');
const validate = require('express-validation');
const APIError = require('../../APIError');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/', routes);

app.use((err, req, res, next) => {
  if (err instanceof validate.ValidationError) {
    // validation error contains errors which is an array of error each containing message[]
    const msg = err.errors.map(error => error.messages.join('. ')).join(' and ');
    const e = new APIError(HttpStatus.BAD_REQUEST, `${msg}`);
    return next(e);
  } else if (!(err instanceof APIError)) {
    const status = err.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const e = new APIError(status, err.message);
    return next(e);
  }
  return next(err);
});

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
})

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    }
  })
})

module.exports = app;
