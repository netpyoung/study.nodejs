// modules
var http    = require('http');        // ref: http://nodejs.org/api/http.html
var express = require('express');     // ref: http://expressjs.com/api.html
var socketio = require('socket.io');  // ref: http://socket.io/#how-to-use

// vars
var conf = {
    port: 8080,
    page_dir: __dirname
};

// app setting
var app = express();
var server = http.createServer(app);
var io = socketio.listen(server);

// functions
function send_file(res, page_name) {
    res.sendfile(conf.page_dir + '/' + page_name);
}

// /test2
// q- : request, s- response
app.get('/test2', function (req, res) {
    send_file(res, 'test2.html');
});

function on_test2 (socket) {
    // q-get-name
    socket.on('q-set-name', function (data) {
        console.log('!!!q-set-name:', data);
        socket.set('name', data);
    });

    // q-set-name
    socket.on('q-get-name', function () {
        console.log('!!!q-get-name');

        socket.get('name', function (err, data) {
            socket.emit('s-get-name', data);
        });
    });
}

io.of('/test2').on('connection', on_test2);

// main
server.listen(conf.port);




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
