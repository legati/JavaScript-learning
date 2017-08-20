var request = require("request");

var googleSearchUrl = function(key, callback) {
        var query = 'https://www.google.com.au/search?q=' + key;
        request(query, function(err, resp, body){
        if (err) throw err;
        //console.log(resp.statusCode);
        callback(body.slice(0,20));
                });
};

googleSearchUrl('Petta', console.log);

