var http = require('http');

var server = http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type':'text/plain'});
    response.end('Hello, world');
});

//Listen to port localhost:8000
server.listen(8000);

console.log('Server running at http://localhost:8000/')