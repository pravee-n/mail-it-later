var express = require('express');
var app = express();
var path = require('path');
var pocket = require('pocket-api');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var Sequelize = require('sequelize');

// app.use("/", express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public'))); //  "public" off of current is root


app.get('/', function(req, res){
    res.sendfile('index.html');
    // res.send('Hello World');
});

app.use(cookieParser());
app.use(session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: 'shhhh, very secret'
}));


var sequelize = new Sequelize('mail-it-later', 'root', 'root', {
    dialect: "mysql", // or 'sqlite', 'postgres', 'mariadb'
    port: 3306, // or 5432 (for postgres)
});

sequelize
    .authenticate()
    .complete(function(err) {
        if (!!err) {
            console.log('Unable to connect to the database:', err);
        } else {
            console.log('Connection has been established successfully.');
        }
    });

var User = sequelize.define('User', {
    username: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    access_token: Sequelize.STRING,
    request_token: Sequelize.STRING,
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

sequelize
    .sync()
    .complete(function(err) {
        if (!!err) {
            console.log('An error occurred while creating the table:', err);
        } else {
            console.log('It worked!');
        }
    });

app.get('/authenticate', function(req, res) {
    // console.log( 'REACHED HERE' );
    var consumerKey = '34005-509b53b505bc9f4818042bc9';
    var redirectUri = 'http://localhost:3000/pocketReturn';
    
    if (req.session.pocketRequestToken) {
        console.log('redirecting');
        console.log(req.session.pocketRequestToken);
        res.redirect('/getAccessToken');
        console.log('before return');
        return;
    }

    console.log('still there');
    var token = pocket.getRequestToken( consumerKey , function( data ) {
        // var requestToken = data.code;
        req.session.pocketRequestToken = data.code;
        var pocketUrl = 'https://getpocket.com/auth/authorize' +
                            '?request_token=' + req.session.pocketRequestToken +
                            '&redirect_uri=' + redirectUri;
        res.redirect(pocketUrl);
    });
});

app.get('/pocketReturn', function (req, res) {
    res.redirect('/getAccessToken');
});

app.get('/getAccessToken', function (req, res) {
    var consumerKey = '34005-509b53b505bc9f4818042bc9';
    console.log(req.session.pocketRequestToken);
    pocket.getAccessToken( consumerKey, req.session.pocketRequestToken, function(data) {
        console.log(data);
        User.find({ where: { username: data.username } })
            .complete(function(err, user) {
                if (!!err) {
                    console.log('An error occurred while searching for this username:', err);
                } else if (!user) {
                    console.log('No user with this username has been found.');
                    User
                        .create({
                            username: data.username,
                            access_token: data.access_token,
                            request_token: req.session.pocketRequestToken
                        })
                        .complete(function(err, user) {
                            console.log('new user added successfully');
                        });
        
                } else {
                    console.log('updating');
                    user.access_token = data.access_token;
                    user.save().success(function() {
                        console.log('updated successfully');
                    });
                }
            });
        res.send(data);
    });
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});