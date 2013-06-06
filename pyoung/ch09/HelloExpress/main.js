// modules
var express = require('express'); // ref: http://expressjs.com/api.html
var cons = require('consolidate'); // ref: https://github.com/visionmedia/consolidate.js/
var swig = require('swig'); // ref: http://paularmstrong.github.io/swig/docs/

// vars
var conf = {
    port: 8080,
    page_dir: __dirname + '/pages',
};

// app setting
var app = express();
app.set('view engine', 'swig'); // view engine: .swig 확장자 처리.
app.engine('swig', cons.swig); // .swig를 렌더링할때 사용할 엔진.
app.set('views', conf.page_dir); // views: 렌더링할 폴더.
app.use(express.cookieParser());

swig.init({
    root: conf.page_dir,
    allowErrors: true,
    autoescape: false
});

// functions
function get_expires_from_now(millisec) {
    return new Date(Date.now() + millisec);
}

// main
app.get('/test-swig', function (req, res) {
    res.render('test-swig', {
        pagename: 'awesome people',
        authors: ['Paul', 'Jim', 'Jane']
    });
});

app.get('/test-layout', function (req, res) {
    res.render('test-layout', {
        title: 'Hello world',
        pagename: 'awesome people',
        authors: ['Paul', 'Jim', 'Jane']
    });
});

app.get('/test-cookie', function (req, res) {
    var millisec = 5 * 60 * 1000;

    res.cookie('test-expires', 'value1', {
        expires: get_expires_from_now(millisec)
    });
    res.cookie('test-max-age', 'value2', {
        maxAge: millisec
    });

    res.send('<h1>' + JSON.stringify(req.cookies) + '</h1>');
});

app.listen(conf.port);
