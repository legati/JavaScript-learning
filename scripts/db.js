var mongo = require('mongodb'), http = require('http');
var MongoClient = mongo.MongoClient;
var url = 'mongodb://localhost:27017/test2';

//Executive part

/*
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    db.collection('customers').find({}).toArray(function(err, result) {
        if (err) throw err;
        document.write(result.name);
        db.close()
    });
});
*/

MongoClient.connect(url, function(err, db){
    if (err) throw err;
    db.collection('customers').find({ _id: 154}).toArray(function(err, result){
        if (err) throw err;
        console.log(result[0].name);
        db.close();
    })
})

//var resultCursor = MongoClient.connect(url, function(err, db){if (err) throw err;var query = { _id: 154};
//var result = db.collection('customers').findOne(query, function(err, result){if (err) throw err;return(result.name);
    //db.close();}); return(result)}); var resultLine = resultCursor.next(); resultLine
