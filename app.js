var express = require('express')
var app = express()

// app.use("/", express.static(__dirname + '/public'));
var path = require('path');
app.use(express.static(path.join(__dirname, 'public'))); //  "public" off of current is root


app.get('/', function(req, res){
    res.sendfile('index.html');
    // res.send('Hello World');
});

app.get('/authenticate', function(req, res) {
    console.log( 'REACHED HERE' );
    var token = pocket.getRequestToken( '34005-509b53b505bc9f4818042bc9' , function( data ) {
        res.send( data );
    });
});



var pocket = require('pocket-api')

var consumer_key = 'your consumer_key';


var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})