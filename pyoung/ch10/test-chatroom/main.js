//// modules
var http     = require('http');       // ref: http://nodejs.org/api/http.html
var express  = require('express');    // ref: http://expressjs.com/api.html
var socketio = require('socket.io');  // ref: http://socket.io/#how-to-use

var cons = require('consolidate'); // ref: https://github.com/visionmedia/consolidate.js/
var swig = require('swig');        // ref: http://paularmstrong.github.io/swig/docs/

var _ = require('underscore');        // ref: http://underscorejs.org/
_.str = require('underscore.string'); // ref: https://github.com/edtsech/underscore.string
_.mixin(_.str.exports());

//// vars
var conf = {
    port: 8080,
    page_dir: __dirname,
    resources_dir: __dirname + '/resources'
};

// db
var g_db = [
    {
	username: 'nodejs',
	password: '123'
    },
    {
	username: 'underscore',
	password: '123'
    }
]

//// const
// status_db
var OK = 0;
var ERR_INVALID_USERNAME = -1;
var ERR_INVALID_PASSWORD = -2;

//// functions
function try_access_userinfo(username, password) {
    var userinfo = _.find(g_db, function (o) { return _.isEqual(o.username, username); });

    if (_.isUndefined(userinfo))                 return ERR_INVALID_USERNAME;
    if (!_.isEqual(userinfo.password, password)) return ERR_INVALID_PASSWORD;
    return OK;
}

function is_error(status_code) {
    return status_code < 0;
}

function has_userinfo(username, password) {
    return !is_error(try_access_userinfo(username, password));
}

function send_file(res, page_name) {
    res.sendfile(conf.page_dir + '/' + page_name);
}

//// app setting
var app = express();
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.static(conf.resources_dir));

app.set('view engine', 'swig');
app.engine('swig', cons.swig);
app.set('views', conf.page_dir);

swig.init({
    root: conf.page_dir,
    allowErrors: true,
    autoescape: false
});

var server = http.createServer(app);
var io = socketio.listen(server);

//// GET: login
app.get('/login', function (req, res) {
    send_file(res, 'login.html');
});

//// POST: login
app.post('/login', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    if (has_userinfo(username, password)) {
	res.cookie('username', username);
	res.cookie('auth', 'true');
	res.redirect('/chat');
    }
    else {
	res.redirect('/fail');
    }
});

//// GET: fail
app.get('/fail', function (req, res) {
    send_file(res, 'fail.html');
});

//// GET: chat
app.get('/chat', function (req, res) {
    var has_auth = _.isEqual(req.cookies.auth, 'true');

    if (has_auth) {
	var username = req.cookies.username;
	res.render('chat', { username: username });
    }
    else {
	res.redirect('/fail');
    }
});

var ns_chat = io.of('/chat');
ns_chat.on('connection', function(socket) {
    socket.on('req-message', function (obj) {
	ns_chat.emit('res-message', obj);
    });
});

// main
server.listen(conf.port);
