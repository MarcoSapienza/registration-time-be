var createError = require('http-errors');
var express = require('express');
// var path = require('path');
var cookieParser = require('cookie-parser');
const bearerToken = require('express-bearer-token');
var logger = require('morgan');
const isAuth = require('./auth/authentication');

const db = require('./dao/db');
// var notifierController = require('./notifier/notifier.controller');


// const indexRouter = require('./routes/index');
// const operatorsRouter = require('./routes/operators');
// const subjectsRouter = require('./routes/subjects');
// const paperworksRouter = require('./routes/paperworks');
// const appointmentsRouter = require('./routes/appointments');
// const categoryRouter = require('./routes/appointments.category');
// const transactionsRouter = require('./routes/transactions');
// const statisticsRouter = require('./routes/statistics');
// const notifierRouter = require('./routes/notifier');
// const rolesRouter = require('./routes/roles');
// const documentRouter = require('./routes/documents');
const customerRouter = require('./routes/customer');
const projectRouter = require('./routes/project');
const registrationTimeRouter = require('./routes/registrationtime');



var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bearerToken());

app.use(
    function crossOrigin(req,res,next){
        res.header('Access-Control-Allow-Origin','*');
        res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Headers','Content-Type, Authorization, Content-Length, X-Requested-With');
        if('OPTIONS' === req.method){
            res.sendStatus(200);
        }
        else
            next();
    }
);


// app.use('/api/', indexRouter);
// app.use('/api/operators', operatorsRouter);
// app.use('/api/subjects', isAuth, subjectsRouter);
// app.use('/api/paperworks', isAuth, paperworksRouter);
// app.use('/api/appointments', isAuth, appointmentsRouter);
// app.use('/api/transactions', isAuth, transactionsRouter);
// app.use('/api/category', isAuth, categoryRouter);
// app.use('/api/statistics', isAuth, statisticsRouter);
// //app.use('/api/notifier', isAuth, notifierRouter);
// app.use('/api/roles', isAuth, rolesRouter);
// app.use('/api/documents', isAuth, documentRouter);
app.use('/api/customer',customerRouter);
app.use('/api/project', projectRouter);
app.use('/api/registrationtime', registrationTimeRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log(err)
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// notifierController.startNofitier();

module.exports = app;
