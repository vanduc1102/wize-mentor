'use strict';

const express = require('express');
const app = express();
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const session = require('express-session');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');


app.use(helmet());
app.disable('x-powered-by');
app.use(compression());
app.set('trust proxy', 1) // trust first proxy
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use(methodOverride())


app.use(express.static(path.resolve('./public')));
app.use(session({
  secret: 's3Cur3',
  name: 'sessionId'
}));


app.get('/hello', (req, res) => res.send('Hello World!'));

app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

app.listen(3000, () => console.log('Example app listening on port 3000!'));

function logErrors (err, req, res, next) {
  console.error(err.stack)
  next(err)
}

function errorHandler (err, req, res, next) {
  res.status(500)
  res.render('error', { error: err })
}

function clientErrorHandler (err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' })
  } else {
    next(err)
  }
}




