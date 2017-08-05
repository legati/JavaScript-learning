var http = require('http');

var currentdate = new Date();
var datetime = currentdate.getDate() + "/"+ (currentdate.getMonth() + 1) + "/" 
+ currentdate.getFullYear() + " @ " + currentdate.getHours() + ":" 
+ currentdate.getMinutes() + ":" + currentdate.getSeconds();

var server = http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type':'text/plain'});
    response.end('Hello, world' + '\n' + datetime);
});

//Listen to port localhost:8000
server.listen(8000);

console.log('Server running at http://localhost:8000/')