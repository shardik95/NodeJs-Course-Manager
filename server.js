var express = require('express')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/course-manager');
var bodyParser = require('body-parser');

var app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin",
        "http://localhost:4200");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

var session = require('express-session')
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'any string'
}));

var userService = require('./services/user.service.server');
userService(app);

var sectionService = require('./services/section.service.server');
sectionService(app);

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.listen(4000);