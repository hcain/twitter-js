var _ = require('lodash');

var data = [];

function add (name, content, id) {
  data.push({ name: name, content: content });
}

function list () {
  uniques();
  return data;
}

function uniques (){
  var uniqueNames = [];
  
  data.forEach(function(o){
   // console.log(o)
 //   uniqueNames.push(o.name);
  if(_.indexOf(uniqueNames, o.name) === -1){
      uniqueNames.push(o.name);
  }
  })
  data.uniques = uniqueNames.length;
}


function find (properties) {
  return _.cloneDeep(_.filter(data, properties));
}

module.exports = { add: add, list: list, find: find , uniques: uniques};

var randArrayEl = function(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getFakeName = function() {
  var fakeFirsts = ['Nimit', 'Dave', 'Shanna', 'Charlotte', 'Scott', 'Ayana', 'Omri', 'Gabriel', 'Joe'];
  var fakeLasts = ['Hashington', 'Stackson', 'McQueue', 'OLogn', 'Ternary', 'Claujure', 'Dunderproto', 'Binder', 'Docsreader', 'Ecma'];
  return randArrayEl(fakeFirsts) + " " + randArrayEl(fakeLasts);
};

var getFakeTweet = function() {
  var awesome_adj = ['awesome', 'breathtaking', 'amazing', 'funny', 'sweet', 'cool', 'wonderful', 'mindblowing'];
  return "Fullstack Academy is " + randArrayEl(awesome_adj) + "! The instructors are just so " + randArrayEl(awesome_adj) + ". #fullstacklove #codedreams";
};

for (var i = 0; i < 50; i++) {
  module.exports.add( getFakeName(), getFakeTweet() );
}
testing branch