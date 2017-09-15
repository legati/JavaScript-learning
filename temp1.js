var connectToDB = new Promise(function(resolve, reject){
    var db = MongoClient.connect(url);
    if (db) {
        resolve(db);
    }
    else {
        reject(error);
    }
})

var findQuery = function(db, query) {
    return new Promise(
        (resolve, reject) => {
            var dbRes = (db.collection('customers').find(query).toArray)[0].name;
            if (dbRes){
                resolve(dbRes)
            } else {
                reject(error);
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
                if (searchRes) resolve(searchRes); else reject(error); 
            })
        }
    )
}

var insertQuery = function(db, doc) {
    return new Promise(
        (resolve, reject) => {
            try {
                db.collection('customers').insert(doc);
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


var makeOurCall = function() {
    connectToDB.
    then(findQuery)
    .then(googleQuery)
    .then(insertQuery)
    .then(finish)
    .catch(error => console.log(error.message));    
}

makeOurCall()