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

// /hello
app.get('/hello', function (req, res) {
    send_file(res, 'hello.html');
});

// /test1
app.get('/test1', function (req, res) {
    send_file(res, 'test1.html');
});

function on_test1 (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
}


io.of('/test1').on('connection', on_test1);
//io.sockets.on('connection', on_test1);

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
