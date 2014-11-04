var express = require('express')
var app = express()

// app.use("/", express.static(__dirname + '/public'));
var path = require('path');
app.use(express.static(path.join(__dirname, 'public'))); //  "public" off of current is root


app.get('/', function(req, res){
    res.sendfile('index.html');
    // res.send('Hello World');
});

app.get('/auth', function(req, res){
    res.sendfile(__dirname + '/public/auth.html');
    // res.send('Hello World');
});

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})