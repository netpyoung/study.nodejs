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
    // setname이 머지?
    socket.on('setname', function (data) {
	socket.set('name', data);
    });

    socket.on('getname', function () {
	socket.get('name', function (err, data) {
	    socket.emit('responsename', data);
	});
    });
});
