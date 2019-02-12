var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var keywordRouter = require('./routes/keyword');
var databaseRouter = require('./routes/database');
var locationRouter = require('./routes/location');
var queryRouter = require('./routes/query');

var bodyParser = require('body-parser'); //connects bodyParsing middleware

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/keyword', keywordRouter);
app.use('/database', databaseRouter);
app.use('/location', locationRouter);
app.use('/query', queryRouter);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.route('/upload')
//     .post(function (req, res, next) {
//
//         var form = new formidable.IncomingForm();
//         //Formidable uploads to operating systems tmp dir by default
//         form.uploadDir = "./img";       //set upload directory
//         form.keepExtensions = true;     //keep file extension
//
//         form.parse(req, function(err, fields, files) {
//             res.writeHead(200, {'content-type': 'text/plain'});
//             res.write('received upload:\n\n');
//             console.log("form.bytesReceived");
//             //TESTING
//             console.log("file size: "+JSON.stringify(files.fileUploaded.size));
//             console.log("file path: "+JSON.stringify(files.fileUploaded.path));
//             console.log("file name: "+JSON.stringify(files.fileUploaded.name));
//             console.log("file type: "+JSON.stringify(files.fileUploaded.type));
//             console.log("astModifiedDate: "+JSON.stringify(files.fileUploaded.lastModifiedDate));
//
//             //Formidable changes the name of the uploaded file
//             //Rename the file to its original name
//             fs.rename(files.fileUploaded.path, './img/'+files.fileUploaded.name, function(err) {
//                 if (err)
//                     throw err;
//                 console.log('renamed complete');
//             });
//             res.end();
//         });
//     });

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
