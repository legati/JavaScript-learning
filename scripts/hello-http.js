var http = require('http');
var httpRequest = require('request');

var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var url = 'mongodb://localhost:27017/test2';

function insertDocuments (db, doc, callback){
        // A function for adding a document into a database
        // Possible errors: db not accessible, doc is undefined or wrong type, callback error

        //Get the doc collection
    var collection = db.collection('customers');
    if (typeof doc !== 'Object') {ins = Object(doc);} else {ins = doc};
    //Insert documents
    collection.insert(ins, function(err, result) {
        if (err) {
                console.error("Something wrong with insertion, ", err);
                return;
        };        
        console.log("Inserted a doc");
        callback && callback(result);
        });
};

function googleSearchUrl (err, key, length, callback) {
        // A function for passing a query containing 'key' to the google search engine
        // and returning a result of length 'length' to a 'callback' function
        // Possible errors: length is not a valid number, no http connection
        var query = 'https://www.google.com.au/search?q=' + key;
        httpRequest(query, function(err, resp, body){
        if (err) {
                console.error("Experienced an error with the request, ", err);
                return;
        };
        var searchOut = body && body.slice(0,length);
        callback && callback(err, searchOut);
        });
};


//creating server
var server = http.createServer(function (request, response) {
    var currentdate = new Date();

    response.writeHead(200, {'Content-Type':'text/plain'});
    response.write('Hello, world' + '\n' + currentdate + '\n' + Math.random() + '\n');

    MongoClient.connect(url, function(err, db){
        if (err) {
                console.error('Database error: ', err);
                response.end('No database');
                return;
        };
        var myQuery = {_id: 154};
        db.collection('customers').find(myQuery).toArray(function(err, results) {
                if (err) {
                        console.error ('Sorry, could not reach the database', err);
                        response.end('Database failed, sorry');
                        return;
                };
                var dbRes = String(results[0].name);
                response.write(dbRes + '\n');
                googleSearchUrl(err, dbRes, 9, function finishedSearch(err, searchOut) {
                        if (err) {
                                console.error('Bad search, sorry ', err);
                                response.end('No result');
                                return;
                        };
                        response.write('test \n' + String(searchOut));
                        insertDocuments(db, searchOut, function() {
                                if (err) {
                                        console.error('Insertion error: ', err);
                                        db.close();
                                        response.end('Bad insertion');
                                };
                                db.close();
                                response.end('Success!');
                        });
                });
        });
    });
});

//Listen to port localhost:8000
server.listen(8000);

//Console output indicating server startup
console.log('Server running at http://localhost:8000/')
