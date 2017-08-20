var http = require('http');
var httpRequest = require('request');
//var xml = require("w3c-xmlhttprequest");

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

var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var url = 'mongodb://localhost:27017/test2';

function insertDocuments (db, doc, callback){
    //Get the doc collection
    var collection = db.collection('documents');
    //Insert documents
    collection.insert(doc, function(err, result) {
        if (err) throw err;        
        console.log("Inserted a doc");
        callback(result);
        });
};

function googleSearchUrl (err, key, callback) {
        if (err) throw err;
        var query = 'https://www.google.com.au/search?q=' + key;
        httpRequest(query, function(err, resp, body){
        if (err) throw err;
        var searchOut = body.slice(0,40);
        callback && callback(searchOut);
        });
};

function finalize(db, response) {
        response.end();
        db.close();
}

//creating server
var server = http.createServer(function (request, response) {
    var currentdate = new Date();

    response.writeHead(200, {'Content-Type':'text/plain'});
    response.write('Hello, world' + '\n' + currentdate + '\n' + Math.random() + '\n');

    MongoClient.connect(url, function(err, db){
        if (err) throw err;
        db.collection('customers').find({ _id: 154}).toArray(function(err, results) {
                if (err) throw err;
                var dbRes = String(results[0].name);
                response.write(dbRes + '\n');
                googleSearchUrl(err, dbRes, function finishedSearch(err, searchOut) {
                        if (err) console.error(err);
                        response.write('test \n' + String(searchOut));
                        finalize(db, response);
                });
        });
    });
});

//Listen to port localhost:8000
server.listen(8000);

//Console output indicating server startup
console.log('Server running at http://localhost:8000/')

//Database