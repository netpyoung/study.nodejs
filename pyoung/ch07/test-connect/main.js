var connect = require('connect');

// vars
var g_port = 8080;


// funcs
function fn1 (request, response, next) {
    console.log("fn1");
    next();
}

function fn2 (request, response, next) {
    console.log("fn2");
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end('<h1>Hello world</h1>');
}

// __중요__
// connect는 (request, response, next) 형태를 지닌 함수를 받을 수 있음.
// :TODO
// middleware :
// - query
// - logger
// - errorHandler
// - static << 간단하게 이미지 테스트하기 괜찮은듯?
// - router : connect.router(function (app) {...}); // good
// - cookieParser << 중요.
// - bodyParser << 중요.
// - session

connect.createServer(fn1, fn2)
    .listen(g_port, function () {
	console.log('running');
    });
