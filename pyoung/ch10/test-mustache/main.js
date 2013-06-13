// modules
var express = require('express');     // ref: http://expressjs.com/api.html
var cons    = require('consolidate'); // ref: https://github.com/visionmedia/consolidate.js/
var hogan   = require('hogan.js');    // ref: https://github.com/twitter/hogan.js/

// vars
var conf = {
    port: 8080,
    page_dir: __dirname + '/pages'
};

// app setting
var app = express();
app.set('view engine', 'mustache');
app.engine('mustache', cons.hogan);
app.set('views', conf.page_dir);

// main
app.get('/test1', function (req, res) {
    res.render('test1', {
	title: 'test1'
    });
});

app.listen(conf.port);
