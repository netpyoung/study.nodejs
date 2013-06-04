/**
 * Module dependencies.
 */

// modules
var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , life = require('./routes/life')
  , http = require('http')
  , path = require('path');


// vars
var app = express();

var g_port = 8080;

// all environments

app.set('port', process.env.PORT || g_port);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
//app.use(express.cookieParser());
app.use(express.cookieParser()); // 순서 주의
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// 커스톰.
app.set('case sensitive routes', true);
app.use(express.logger());


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);


// Routes
// app.get('/life', function (request, response, next) {
//     // response.writeHead(200, {'Content-Type': 'text/html'});
//     // response.end('<h1>Life Page</h1>');
//     response.send('<h1>Life Page</h1>', {'Content-Type': 'text/html'}, 200);
// });
app.get('/life', life.life);

app.get('/Product', function (request, response) {
    response.render('product', {
	title: 'Product Page'
    });
});

app.get('/Product/Insert', function (request, response) {
    response.render('product/insert', {
	title: 'Insert Page'
    });
});

app.get('/Product/Edit', function (request, response) {
    response.render('product/edit', {
	title: 'Edit Page'
    });
});

app.get('/Redirect', function (request, response) {
    // response.writeHead(302, {'Location': 'http://google.com'});
    // response.end();
    response.redirect('https:/google.co.kr');
});

// app.get('/Cookie', function (request, response) {
//     var date = new Date();
//     date.setDate(date.getDate() + 7);

//     response.writeHead(302, {
// 	'Content-Type': 'text/html',
// 	'Set-Cookie': [
// 	    'name1 = value1;expires = ' + date,
// 	    'name2 = value2;sequre;'
// 	]
//     });
//     response.end('<h1>' + JSON.stringify(request.cookies) + '</h1>');
// });

app.get('/Cookie', function (request, response) {
    response.cookie('name1', 'value1');
    response.cookie('name2', 'value1');
    response.writeHead({'Content-Type': 'text/html'});
    console.log(request.cookies);
    response.end('<h1>' + JSON.stringify(request.cookies) + '</h1>');
});

app.get('/OnlyFirefox', function (request, response) {
    var agent = request.header('User-Agent');
    console.log(agent);

    if (agent.toLowerCase().match(/firefox/)) {
	 response.writeHead(200, {'Content-Type': 'text/html'});
	response.end('<h1>Firefox Page</h1>');
    }
    else {
	response.redirect('/');
    }
});

app.get('/Product/:id', function (request, response) {
    var output = '';
    output += '<h1>id: ' + request.param('id') + '</h1>';
    output += '<h1>name: ' + request.param('name') + '</h1>';
    response.end(output);
});

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
    console.log('mode', app.settings.env);
});
// app.listen(g_port);
