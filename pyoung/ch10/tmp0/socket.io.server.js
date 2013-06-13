var http = require('http');
var fs = require('fs');

var socketio = require('socket.io');

// vars
var conf = {
    port: 8080
};

var g_id = 0;

// main
var server = http.createServer(function (req, res) {
    fs.readFile('HTMLPage.html', function (err, data) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end(data);
    });
});

server.listen(conf.port);

var io = socketio.listen(server);
io.set('log level', 2);
io.sockets.on('connection', function(socket) {
    g_id = socket.id;

    socket.on('rint', function(data) {
	console.log('Client Send Data:', data);
	// socket.emit('smart', data); // public
	// socket.broadcast.emit('smart', data); // broadcast
	console.log(g_id);
	io.sockets.sockets[g_id].emit('smart', data);
    });
});
