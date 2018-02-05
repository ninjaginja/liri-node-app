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
    var input = process.argv;
    var songName = "";
    if (process.argv.length > 3) {
      for (var i = 3; i < input.length; i++) {
        if (i > 3 && i < input.length) {
          songName = songName + '+' + (input[i]);
        } else {
          songName += input[i];
        }
      }

      spotify.search({ type: 'track', query: songName }, function(err, data) {
        if (!err) {
          // console.log(JSON.stringify(data, null, 4));
          console.log("------------------------------------------")
          console.log('Artist: ' + data.tracks.items[0].artists[0].name);
          console.log('Song name: ' + songName.replace('+', ' ').replace(/(^|\s)[a-z]/g,function(f){return f.toUpperCase();}));
          console.log('Preview link: ' + data.tracks.items[0].external_urls.spotify);
          console.log('Album: ' + data.tracks.items[0].album.name);
          console.log("------------------------------------------")
        } else {
          console.log('Error occurred: ' + err);
        }
      });
    } else {
          spotify
          .request('https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE')
          .then(function(data) {
            console.log("------------------------------------------")
            console.log('"' + data.name + '"' + ' by ' + data.album.artists[0].name);
            console.log("------------------------------------------")
          })
          .catch(function(err) {
            console.error('Error occurred: ' + err);
          });
        }
  }
    else if (command == 'movie-this') {
      // console.log('movie-this');
      var input = process.argv;
      var movieName = "";
      if (input.length > 3) {
        for (var i = 3; i < input.length; i++) {
          if (i > 3 && i < input.length) {
            movieName = movieName + '+' + (input[i]);
          } else {
            movieName += input[i];
          }
        }
        var movieQueryUrl = "http://www.omdbapi.com/?apikey=trilogy&type=movie&plot=short&t=" + movieName;
        request(movieQueryUrl, function(error, response, body) {
          if (!error && response.statusCode === 200) {
            console.log("------------------------------------------")
            console.log("Movie title: " + JSON.parse(body).Title);
            console.log("Released: " + JSON.parse(body).Year);
            console.log("IMDB rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Produced in: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("------------------------------------------")
          }
        });

      } else {
          var mrNobodyUrl = "http://www.omdbapi.com/?apikey=trilogy&type=movie&plot=short&t=mr+nobody";
          request(mrNobodyUrl, function(error, response, body) {
            if (!error && response.statusCode === 200) {
              // console.log(JSON.parse(body));
              console.log("------------------------------------------")
              console.log("Movie title: " + JSON.parse(body).Title);
              console.log("Released: " + JSON.parse(body).Year);
              console.log("IMDB rating: " + JSON.parse(body).imdbRating);
              console.log("Rotten Tomatoes rating: " + JSON.parse(body).Ratings[1].Value);
              console.log("Produced in: " + JSON.parse(body).Country);
              console.log("Language: " + JSON.parse(body).Language);
              console.log("Plot: " + JSON.parse(body).Plot);
              console.log("Actors: " + JSON.parse(body).Actors);
              console.log("------------------------------------------")
            }
          });
        }

    }
      else if (command == 'do-what-it-says') {
      console.log('do-what-it-says');

      } else {
        console.log("Please enter a command.");
        }
