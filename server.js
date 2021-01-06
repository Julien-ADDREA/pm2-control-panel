// Modules
var express = require('express');
var app = express();
const basicAuth = require('express-basic-auth')
var http = require('http');
var https = require('https');
var bodyParser = require('body-parser');

// Use SSL or not
var ssl = false;

// Set server port
var port = process.env.PORT || 8282;

// Set server options
if (ssl) {
    var options = {
        key: fs.readFileSync('./ssl/privkey.pem'),
        cert: fs.readFileSync('./ssl/cert.pem'),
    };
}

// Create server
if (ssl) {
    var server = https.createServer(options, app).listen(port);
} else {
    var server = http.createServer(app).listen(port);
}
console.log("Server running on " + ((ssl) ? "https" : "http") + "://0.0.0.0:" + port);

// Require and configure socket.io
var io = require('socket.io')(server);

// Require auth
app.use(basicAuth({
    users: {
        'admin': 'toor',
        'adam': 'password1234',
        'eve': 'asdfghjkl',
    },
    challenge: true,
}));

// Parse application/json
app.use(bodyParser.json());

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Serve up static assests
app.use(express.static(__dirname + '/public'));

// Set pug as view engine
app.set('view engine', 'pug');

// Routes
require('./app/routes')(app);

// IO
require('./app/io')(io);

// Expose app
exports = module.exports = app;