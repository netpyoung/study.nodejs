exports.index = function (request, response) {
    response.render('index', {title: 'Express'});
};

exports.life = function (request, response) {
     // response.writeHead(200, {'Content-Type': 'text/html'});
     // response.end('<h1>Life Page</h1>');
     response.send('<h1>Life Page</h1>', {'Content-Type': 'text/html'}, 200);
}
