var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var userRouter = require('./routes/user');                              // <--  files il[routes] index.js rename to user.js then also path change  from here (var userRouter & '/user')
var adminRouter = require('./routes/admin');                           // <-- files il[routes] users.js rename to admin.js then also path change  from here (var adminRouter & '/admin')
var hbs = require('express-handlebars')                                 // ith npm create cheythathanu partials(oru folder kanam layoutil) lek connect akan vendi
var app = express();
var fileUpload = require('express-fileupload');
var db = require('./config/connection');
var seccion = require('express-session')
var nocache = require('nocache')



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({extname : 'hbs', defaultLayout : 'layout', layoutsDir :__dirname+'/views/layout/',partialsDir:__dirname+'/views/partials/'}))           // ith npm create cheythathanu partials lek connect akan vendi
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());
app.use(seccion({secret:"key",cookie:{maxAge:600000}}))          // automatic ayi login cheythath close avan vendi 
app.use(nocache())                                              // no cache using --> back adichal back avathe nikkan

db.connect((err)=>{
if(err) console.log('connection error'+err)
else console.log('connected to port 27017')
})

app.use('/', userRouter);                                          //ivdem name matanam mukalil koduthathinu shesham (indexRouter --> userRouter)
app.use('/admin', adminRouter);                                   // userRouter to adminRouter  && /users to /admin  (/ kodukkunnath route set akkunnathanu athayath localhostil kanditille localhost:3000/)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
