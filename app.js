var express = require( 'express' )
var app = express()

var path = require( 'path' );
app.use(express.static( path.join( __dirname, 'source' ) ) ); //  "public" off of current is root


app.get( '/', function( req, res ){
    res.sendfile( 'index.html' );
    // res.send('Hello World');
});

var server = app.listen( 3000, function () {

  var host = server.address().address
  var port = server.address().port

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport();
transporter.sendMail({
    from: 'ankurdnana@gmail.com',
    to: 'drecodeam@gmail.com',
    subject: 'hello',
    text: 'hello world!'
});


  console.log( 'Example app listening at http://%s:%s', host, port )

})