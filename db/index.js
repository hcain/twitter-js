var pg = require("pg");
var postgresUrl = 'postgres://localhost/twitterdb';
var client = new pg.Client(postgresUrl);
// var tweetBank = require('../tweetBank.js');

client.connect(function(error) {
    if (error) {
        throw error;
    }
})

var getDbUsers =  function() {
    client.query('SELECT COUNT(*) count FROM users', function(error, results){
    if (error){return error;}
    // console.log(results.rows);
    console.log(Number(results.rows[0].count));
    // return Number(results.rows[0].count);
    return 5;
    })
}

var getMaxUserId =  function() {
    client.query('SELECT MAX(id) maxid FROM users', function(error, results){
    if (error){return error;}
    return results.rows[0].maxid;
    })
}

var getMaxTweetId = function() {
    client.query('SELECT MAX(id) maxid FROM tweets', function(error, results){
    if (error){return error;}
    return results.rows[0].maxid;
    })
}
   


module.exports = {
    client: client,
    getDbUsers: getDbUsers,
    getMaxUserId: getMaxUserId,
    getMaxTweetId: getMaxTweetId
}
