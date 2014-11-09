var express = require('express');
var router = express.Router();

var pocket = require('pocket-api');
var Sequelize = require('sequelize');


router.get('/authenticate', function(req, res) {
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
        req.session.pocketRequestToken = data.code;
        var pocketUrl = 'https://getpocket.com/auth/authorize' +
                            '?request_token=' + req.session.pocketRequestToken +
                            '&redirect_uri=' + redirectUri;
        res.redirect(pocketUrl);
    });
});


router.get('/pocketReturn', function (req, res) {
    res.redirect('/getAccessToken');
});


router.get('/getAccessToken', function (req, res) {
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

module.exports = router;