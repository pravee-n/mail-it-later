// Import basic express dependencies
var express = require('express');
var path = require('path');
var session = require('express-session');
var cookieParser = require('cookie-parser');

// More dependencies required by the app
var authRoutes = require('./routes/auth.js');
var migrateRoutes = require('./routes/migrate.js');
var Sequelize = require('sequelize');

var app = express();

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: 'shhhh, very secret'
}));
app.use('/', authRoutes);
app.use('/', migrateRoutes);


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});


// Data base settings
var sequelize = new Sequelize('mail-it-later', 'root', 'root', {
    dialect: "mysql", // or 'sqlite', 'postgres', 'mariadb'
    port: 3306, // or 5432 (for postgres)
});


// Connect to database
sequelize
    .authenticate()
    .complete(function(err) {
        if (!!err) {
            console.log('Unable to connect to the database:', err);
        } else {
            console.log('Connection has been established successfully.');
        }
    });