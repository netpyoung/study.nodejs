// 파일이름.
__filename

// full path dir
__dirname

// 전역 객체
console // 콘솔화면
exports // 모듈관련
process // 프로그램 관련



// test
console.log("json %j", {name: 'hello world'}); // => json {"name":"hello world"}

console.time('hello');
console.timeEnd('hello');

// 콘솔에 색상넣으려면, wiki:ANSI_escape_code 참조.

process
process.argv
process.env
process.version
process.arch
process.platform

//process.exit([exitCode = 0])
process.memoryUsage()
process.uptime()

exports.hello = function (n) {
  return n;
}

exports

// ==================
// 04 기본 내장 모듈
// ==================

// os
var os = require('os');
os.hostname()
os.type()
os.platform()
os.arch()
os.release()
os.uptime()
os.loadavg()
os.totalmem()
os.freemem()
os.cpus()
os.getNetworkInterfaces()

// url
var url = require('url');
var parsedObject = url.parse('http://www.hanb.co.kr/trackback/978-89-7914-874-9');
parsedObject

// querystring
var querystring = require('querystring');
var url = require('url');

var p = url.parse('http://hanb.co.kr/book/look.html?isbn=978-89-7914-874-9');
querystring.parse(p.query)

url.parse('http://hanb.co.kr/book/look.html?isbn=978-89-7914-874-9', true);

// util
var util = require('util');
var data = util.format('%d + %d = %d', 1, 2, 3);
data

// fs
var fs = require('fs');

//__dirname
var txt = fs.readFileSync('test.txt', 'utf8');
txt
fs.readFile('test.txt', 'utf8', function (err, data) {
  console.log(data);
});

fs.writeFile('w.txt', data, 'utf8', function (err) {
  console.log('Write File Async Complete');
});


var fs = require('fs');
try {
  var data = fs.readFileSync('test.txt', 'utf8');
  console.log(data);
}
catch (e) {
  console.log(e);
}

Boolean(0);
Boolean(NaN);
Boolean('');
Boolean(null);
Boolean(undefined);
