var express = require('express'),
  app = express(),
  server = require('http').createServer(app),
  io = require('socket.io').listen(server),
  ent = require('ent'),
  chart = require('chart'),
  path = require('path');

app.set('port', process.env.PORT);
//app.set('port', 8080);

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
  }),

  app.get('/temperature/:temp', function(req, res) {
    io.sockets.on('connection', function(socket, data) {
      socket.broadcast.emit('new_temperature', req.params.temp);
    });
    res.redirect('/');
  }),

  server.listen(app.get('port'), function() {
    console.log('Node server is running on port', app.get('port'));
  });
