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

io.sockets.on('connection', function(socket, data) {
  socket.on('new_temperature', function(temperature) {
    socket.broadcast.emit('new_temperature', temperature);
  });
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
})

.get('/:temperature', function(req, res) {
  res.render('temp.ejs', {
    temp: req.params.temperature
  });
})

server.listen(app.get('port'), function() {
  console.log('Node server is running on port', app.get('port'));
});
