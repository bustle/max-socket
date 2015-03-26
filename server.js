var ws              = require('ws');
var http            = require('http');
var port            = process.env.PORT || 5000;
var server          = http.createServer().listen(port);

console.log('starting websocket server');
var wss = new ws.Server({
  server: server
});

// Handle a new connection to the websocket server
wss.on('connection', function(sender) {
  console.log('websocket connection open');
  sender.on('message', function(data) {
    console.log('message received', data);
    wss.clients.forEach(function(client) {
      if (client !== sender) {
        client.send(data);
      }
    });
  });
});
