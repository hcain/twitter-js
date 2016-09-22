var express = require('express');
var router = express.Router();
var tweetBank = require('../tweetBank');
var bodyParser = require('body-parser');
var db = require('../db');
var client = db.client;
var tweetQuery = 'SELECT users.name AS name, tweets.content AS content, users.id AS userid, tweets.id AS tweetid FROM tweets JOIN users ON tweets.userid = users.id';



//router.get('/stylesheets/style.css', function(req,res){
//  console.log(__dirname);
//  res.sendFile('/stylesheets/style.css', {root: __dirname + '/../public/'});
//})



module.exports = function(io){
  router.get('/users/:name', function(req,res){
    var tweets = tweetBank.find({'name':req.params.name});
    res.render('index', {tweets: tweets , showForm: true, defaultName: req.params.name});
  });

  router.get('/', function(req, res){
    // console.log('home');
    // console.log(typeof client, client);
    client.query(tweetQuery, function(error, results){
        if (error){return error;}
        var dbTweets = results.rows;
        // console.log(dbTweets);
        var tweets = tweetBank.addData(dbTweets);
        // var followees = tweetBank.followees;
        console.log(typeof followees, followees);
        // console.log('\n\n\n\n\n');
        // console.log(tweets);
        res.render( 'index', {tweets: tweets , followees: followees, showForm: true, defaultName: ''});
    });
  });

  router.get('/generate', function(req, res) {
    tweetBank.generateData();
    res.redirect('/');
    }
  );

  router.get('/clear', function(req, res) {
    tweetBank.clearData();
    res.redirect('/');
    }
  );

  router.get('/tweets/:id', function(req,res){
    var tweets = tweetBank.list();
    var thisTweet = tweets[Number(req.params.id)];
    res.render( 'index', {tweets: [thisTweet] , showForm: true, defaultName: ''});
  });


  router.post('/tweets', function(req,res){
    var name = req.body.name;
    var text = req.body.text;
    tweetBank.add(name, text);
    io.sockets.emit('newTweet',{name: name, text: text})
    res.redirect('/');
  })



  return router;
}
