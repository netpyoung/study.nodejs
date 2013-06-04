// ===============================================================================
// requires
var fs   = require('fs');
var url  = require('url');
var http = require('http');

// ===============================================================================
// vars
var g_test_html  = 'test.html';
var g_error_html = 'error.html';

var g_port = 8080;


// ===============================================================================
// functions
function process_test (request, response) {
  var header = {
    'Content-Type': 'text/html',
    'Set-Cookie': ['breakfast = toast', 'dinner = chicken'],
  };

  // Head
  response.writeHead(200, header);

  // Body
  fs.readFile(g_test_html, 'utf8', function (err, data) {  
    var cookie = '</ br><h2>' + request.headers.cookie + '</h2></ br>';

    response.end(data + cookie);
  });
}

function process_404 (request, response) {
  // Head
  response.writeHead(400);

  // Body
  fs.readFile(g_error_html, 'utf8', function (err, data) {  
    response.end(data);
  });
}

// ===============================================================================
// event handler
function on_request(request, response) {
  console.log('on_request');
  console.log('request.method:' + request.method)

  var path = url.parse(request.url).pathname;

  if (path == '/' + g_test_html) {
    process_test(request, response);
  }
  else {
    process_404(request, response);
  }
};

function on_connection() {
  console.log('on_connection');
};

function on_listening() {
  console.log('on_listening');
}

// ===========================================
// main
var server = http.createServer(on_request);

server.on('connection', on_connection);

server.listen(g_port, on_listening);
