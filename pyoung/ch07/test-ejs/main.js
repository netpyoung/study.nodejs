var http = require('http');
var fs = require('fs');
var ejs = require('ejs');

var g_port = 8080;
var g_ejs_page = 'EJSPage.ejs';

http.createServer(function (request, response) {
    console.log('connected');
    fs.readFile(g_ejs_page, 'utf8', function (err, data) {
	response.writeHead(200, {'Content-Type': 'text/html'});
	response.end(ejs.render(data));
    });
}).listen(g_port, function () {
    console.log('running');
});
