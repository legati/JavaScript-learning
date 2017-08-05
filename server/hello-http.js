var http = require('http');

//formatting time&date output 
var hours = function(date) {
        var h = date.getHours();
        if (h < 10){h = '0' + h};
        return(h)
    };

var minutes = function(date) {
        var m = date.getMinutes();
        if (m < 10){m = '0' + m};
        return(m)
    };

var seconds = function(date) {
        var s = date.getSeconds();
        if (s < 10){s = '0' + s}; 
        return(s)
    };

//creating server
var server = http.createServer(function (request, response) {
    var currentdate = new Date();
    var datetime = currentdate.getDate() + "/"+ (currentdate.getMonth() + 1) + "/"  + currentdate.getFullYear() + " @ " 
    + hours(currentdate) + ":" + minutes(currentdate) + ":" + seconds(currentdate);
    response.writeHead(200, {'Content-Type':'text/plain'});
    response.end('Hello, world' + '\n' + datetime + '\n' + Math.random());
});

//Listen to port localhost:8000
server.listen(8000);

//Console output indicating server startup
console.log('Server running at http://localhost:8000/')