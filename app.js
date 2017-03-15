const bodyParser = require('body-parser');
const express = require('express');
const moment = require('moment');
const path = require('path');

//Routers
const api = require('./api');
const router = require('./router');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use('/api', api);
app.use(router);

/* Error handling */
app.use(function(err, req, res, next){
  console.log(err);
  res.status(500).end();
});

app.listen(3000);

module.exports = app;
