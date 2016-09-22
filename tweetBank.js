var _ = require('lodash');
var db = require('./db');


var data = [];

function add (name, content, userid, tweetid) {
  data.push({ name: name, content: content, userid: userid, tweetid: tweetid });
}

function list() {
  return data;
}
var dbUsers = db.getDbUsers();
var followees = getFollowees();
var getFollowees = function () {
  // console.log(db.getDbUsers, db.getDbUsers());
  // console.log(data.uniques(), db.getDbUsers());
  console.log(data.uniques())+dbUsers;
  return data.uniques() + dbUsers;
}

data.uniques = function(){
  var uniqueNames = [];
  data.forEach(function(o){
  if(_.indexOf(uniqueNames, o.name) === -1){
      uniqueNames.push(o.name);
  }
  })
  return uniqueNames.length;
}


function find (properties) {
  return _.cloneDeep(_.filter(data, properties));
}

var randArrayEl = function(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var createUserId = function(user, maxUserId) {
  data.forEach(function(tweet){
      if (tweet.name === user){
        return tweet.userid
      }
  });
  return maxUserId + data.length + 1;
}

var createTweetId = function(maxTweetId) {
  return maxTweetId + data.length + 1;
}

var getFakeName = function() {
  var fakeFirsts = ['Nimit', 'Dave', 'Shanna', 'Charlotte', 'Scott', 'Ayana', 'Omri', 'Gabriel', 'Joe'];
  var fakeLasts = ['Hashington', 'Stackson', 'McQueue', 'OLogn', 'Ternary', 'Claujure', 'Dunderproto', 'Binder', 'Docsreader', 'Ecma'];
  return randArrayEl(fakeFirsts) + " " + randArrayEl(fakeLasts);
};

var getFakeTweet = function() {
  var awesome_adj = ['awesome', 'breathtaking', 'amazing', 'funny', 'sweet', 'cool', 'wonderful', 'mindblowing'];
  return "Fullstack Academy is " + randArrayEl(awesome_adj) + "! The instructors are just so " + randArrayEl(awesome_adj) + ". #fullstacklove #codedreams";
};


var generateData = function() {
  for (var i = 0; i < 20; i++) {
    var user = getFakeName();
    var tweet = getFakeTweet();
    var userId = createUserId(user, db.getMaxUserId());
    var tweetId = createTweetId(db.getMaxTweetId());
    module.exports.add(user, tweet, userId, tweetId);
  }
}

var clearData = function() {
  data = [];
}



function addData(array) {
  var results = array.concat(data);
  return results;
}

module.exports = { add: add, 
                   find: find,
                   followees: followees, 
                   generateData: generateData,
                   addData: addData,
                   clearData: clearData,
                  };