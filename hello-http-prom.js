var http = require('http');
var httpRequest = require('request');

var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var myUrl = 'mongodb://localhost:27017/test2';
var query = {_id: 154};
var length = 15;

var connectToDB = function(url) {
    return new Promise(
        (resolve, reject) => {
        var db = MongoClient.connect(url);
        if (db) {
            resolve(db);
        }
        else {
            reject(error.message);
            }
        })
    }
    
    var findQuery = function(db, query) {
        return new Promise(
            (resolve, reject) => {
                //var results = db.collection('customers').find(query).toArray;
                //var dbRes  = String(results.name);
                var dbRes = 'AAA'
                if (dbRes){
                    resolve(dbRes)
                } else {
                    reject(error.message);
                }
            }
        )
    }
    
    var googleQuery = function(key, length) {
        return new Promise(
            (resolve, reject) => {
                var gQuery = 'https://www.google.com.au/search?q=' + key;
                httpRequest(gQuery, function(err, resp, body){
                    if (err) {
                            console.error("Experienced an error with the request, ", err);
                            return;
                    };
                    var searchRes = body && body.slice(length);
                    resolve(searchRes); 
                })
            }
        )
    }
    
    var insertQuery = function(db, doc) {
        return new Promise(
            (resolve, reject) => {
                try {
                    db.collection('customers').insert(doc);
                    //console.log(doc);
                    resolve();
                }
                catch(error){
                    reject(error.message);
                };
            }
        )
    }
    
var finish = function(db, response) {
        db.close();
        response.end();
    }

var makeOurCall = function(response, url) {
        connectToDB(url)
//        .then((db,query) => findQuery(db,query))
//        .then((key, length) => googleQuery(key, length))
//        .then((db,doc) => insertQuery(db, doc))
        .then((db,response) => finish(db,response))
        .catch(error => failureCallback(error));    
    }

var failureCallback = function(error, response) {
    console.log(error.message); 
    response.end(error.message)
}

var myHeader = function(response) {
    return new Promise(
        (resolve, reject) => {
            try {
            var currentdate = new Date();
            response.writeHead(200, {'Content-Type':'text/plain'});
            response.write('Hello, world' + '\n' + currentdate + '\n' + Math.random() + '\n');
            resolve();
            }
            catch(error) {
                console.log(error.message);
                response.end();
            }
        })
}


//creating server
var server = http.createServer(function (request, response) {
    myHeader(response)
    //.then(makeOurCall(response, myUrl));
    .then((response) => {response.end()})
});


//Listen to port localhost:8000
server.listen(8000);

//Console output indicating server startup
console.log('Server running at http://localhost:8000/')
