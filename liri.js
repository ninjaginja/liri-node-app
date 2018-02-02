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

  client.get('statuses/user_timeline', params, function(error, data, response) {
    if(!error) {
    // console.log(data);
      for (var i = 0; i < data.length; i++) {
        console.log(data[i].text + '(' + data[i].created_at + ')');
      }
    } else {
    console.log(error);
    }
  });

}
  else if (command == 'spotify-this-song') {
    console.log('spotify-this-song');
    var spotify = new Spotify({
      id: '5c9e4058b9344f12b1a898462e0f0bd5',
      secret: 'a2f3387a2d284228a6ec1ee35318d0da'
    });
    spotify.search({ type: 'track', query: process.argv[3] }, function(error, data) {
  if (error) {
    return console.log('Error occurred: ' + err);
  } console.log(data);
});

}
  else if (command == 'movie-this') {
  console.log('movie-this');
}
  else if (command == 'do-what-it-says') {
  console.log('do-what-it-says');
}
