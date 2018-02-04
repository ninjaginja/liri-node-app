var request = require("request");
var twitter = require('twitter');
var twitterKeys = require("./keys.js");
var Spotify = require('node-spotify-api');

var command = process.argv[2];

if (command == 'my-tweets') {
  var client = new twitter(twitterKeys);
  var params = {
    screen_name: 'ninjaginja17',
    count: 20,
  }

  client.get('statuses/user_timeline', params, function(err, data, response) {
    if(!err) {
    // console.log(data);
      for (var i = 0; i < data.length; i++) {
        console.log(data[i].text + '(' + data[i].created_at + ')');
      }
    } else {
    console.log(err);
    }
  });
}
  else if (command == 'spotify-this-song') {
    var spotify = new Spotify({
      id: '5c9e4058b9344f12b1a898462e0f0bd5',
      secret: 'a2f3387a2d284228a6ec1ee35318d0da'
    });
    if (process.argv[3] != null) {
      spotify.search({ type: 'track', query: process.argv[3] }, function(err, data) {
        if (!err) {
          console.log(JSON.stringify(data, null, 2));
        } return console.log('Error occurred: ' + err);
      });
    } spotify
        .request('https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE')
        .then(function(data) {
          console.log('"' + data.name + '"' + ' by ' + data.album.artists[0].name);
        })
        .catch(function(err) {
          console.error('Error occurred: ' + err);
        });
}
  else if (command == 'movie-this') {
  console.log('movie-this');
}
  else if (command == 'do-what-it-says') {
  console.log('do-what-it-says');
}
