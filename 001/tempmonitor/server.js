var server = require('http').Server();
var io = require('socket.io')(server);
var cache = [0,0,0,0,0,0,0,0,0,0,0,0];
var max = 0;
var connectCount = 0;
var timeoutID;

server.listen(3000);

io.on('connection', function(socket){
  connectCount++;
  console.log(connectCount + ' stations online.');

  socket.on('message', function(msg){
    cache.push(msg);
    cache.shift();
    msg = Math.max.apply({}, cache);
    if (msg > max) {
      max = msg;
      io.emit('message', max);
      if (timeoutID) { clearTimeout(timeoutID); }
      timeoutID = setTimeout(function() { max--; timeoutID = undefined; }, 1000*29);
    }
  });

  socket.on('disconnect', function() {
    connectCount--;
    console.log(connectCount + ' stations online.');
    if (connectCount === 0) {
      max = 0;
      cache = [0,0,0,0,0,0,0,0,0,0,0,0];
    }
  });
});
