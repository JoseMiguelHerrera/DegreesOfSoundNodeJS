/*eslint-env node*/
// modules
var express = require('express');
//var favicon = require('serve-favicon');
var cfenv = require('cfenv');
var SC = require('node-soundcloud');


// routes
var intro = require('./routes/intro');
var login = require('./routes/login');
var main = require('./routes/main');
var process = require('./routes/process');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');



// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// express app
var app = express();

// view engine setup
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

//use body parser for all views
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


// uncomment after placing your gangsta favicon in /public
app.use(favicon(__dirname + '/public/' + 'favicon.ico'));

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// handle requests for /login route
app.use('/login', login);

// handle requests for /main route
app.get('/main', main);

// handle requests for root route
app.use('/', intro);

// handle requests for /process route
app.post('/process', process);


// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});