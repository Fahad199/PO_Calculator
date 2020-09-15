const createError = require('http-errors');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = require('./src/Endpoints/index');
const sequelize = require('./src/helpers/connection');

const port = process.env.PORT || 5000;

sequelize.sync().then(() => {
  app.listen(port, async () => {
    console.log(`started listening on port ${port}`);
    try {
      await sequelize.authenticate();
      console.log('Database successfully connected!');
    } catch (err) {
      console.error('unable to connect', err);
    }
  });
});

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
