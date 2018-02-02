var request = require("request");
var twitter = require('twitter');
var twitterKeys = require("./keys.js");

var command = process.argv[2];

if (command == 'my-tweets') {
  var client = new twitter(twitterKeys);
  var params = {
    screen_name: 'ninjaginja17',
    count: 20,
  }

  client.get('statuses/user_timeline', params, function(error, data, response) {
    if(!error) {
    console.log(data);
    console.log(response);
    } else {
    console.log(error);
    }
  });

}
  else if (command == 'spotify-this-song') {
  console.log('spotify-this-song');
}
  else if (command == 'movie-this') {
  console.log('movie-this');
}
  else if (command == 'do-what-it-says') {
  console.log('do-what-it-says');
}
