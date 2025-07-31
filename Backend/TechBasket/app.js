var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose=require('mongoose');

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var customerRouter = require('./routes/customer');
var ordersRouter = require('./routes/orders');
const productsRouter = require('./routes/products');

var app = express();
app.use(express.json());
const uri="mongodb+srv://veeraj2132:raj2132@cluster0.p1zk3a4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
async function connectDB(){
  try{
    await mongoose.connect(uri,{
      useNewUrlParser:true,
      useUnifiedTopology:true,
    });
    console.log("connected to MongoDB");
  } catch(error){
    console.error("Error connection to MongoDB:",error);
  }
}
connectDB();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/customer', customerRouter);  
app.use('/orders',ordersRouter);
app.use(express.json());
app.use('/products', productsRouter);

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
