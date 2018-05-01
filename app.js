var express = require('express'),
  app = express(),
  server = require('http').createServer(app),
  io = require('socket.io').listen(server),
  ent = require('ent'),
  chart = require('chart'),
  path = require('path'),
  bodyParser = require('body-parser');

app.set('port', process.env.PORT);
//app.set('port', 8080);

app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}));

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/temperature', function(req, res) {
  io.sockets.on('connection', function(socket, data) {
    socket.broadcast.emit('new_temperature', req.body.temperature);
  });
  //res.redirect('/');
});

server.listen(app.get('port'), function() {
  console.log('Node server is running on port', app.get('port'));
});
