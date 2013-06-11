// modules
var fs = require('fs');
var http = require('http');
var socketio = require('socket.io');
// vars
var conf = {
    port: 8080
};

// main
// server
var server = http.createServer();
server.listen(conf.port, function () {
    console.log('8080');
});

server.on('request', function (req, res) {
    fs.readFile('HTMLPage.html', 'utf8', function (err, data) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end(data);
    });
});

// socket.io
var io = socketio.listen(server);
io.sockets.on('connection', function (socket) {
    socket.on('message', function (data) {
	io.sockets.emit('message', data);
    });
});
