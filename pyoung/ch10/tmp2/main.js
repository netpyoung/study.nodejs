// modules
var fs = require('fs');
var http = require('http');
var socketio = require('socket.io');
// vars
var conf = {
    port: 8080
};

// main
var server = http.createServer();
var io = socketio.listen(server);

server.listen(conf.port, function () {
    console.log('8080');
});

server.on('request', function (req, res) {
    fs.readFile('HTMLPage.html', 'utf8', function (err, data) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end(data);
    });
});

io.sockets.on('connection', function (socket) {
    socket.on('join', function (data) {
	socket.join(data); // 방에 들어가고,
	socket.set('room', data);
    });

    socket.on('message', function (data) {
	socket.get('room', function (err, room) {
	    io.sockets.in(room).emit('message', data); // 방에 들어가 있는 놈들에게 호출
	});
    });
});
