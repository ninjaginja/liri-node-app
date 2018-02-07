var request = require("request");
var twitter = require('twitter');
var twitterKeys = require("./keys.js");
var Spotify = require('node-spotify-api');
var fs = require('fs-extra');

var command = process.argv[2];
var input = [];
var formattedInput = "";

// Twitter function ----------------------------------
function myTweets() {
  var client = new twitter(twitterKeys);
  var params = {
    screen_name: 'ninjaginja17',
    count: 20,
  }

  client.get('statuses/user_timeline', params, function(err, data, response) {
    if(!err) {
      for (var i = 0; i < data.length; i++) {
        console.log(data[i].text + '(' + data[i].created_at + ')');
        console.log("------------------------------------------")
      }
    } else {
    console.log(err);
    }
  });
}
// End Twitter function ------------------------------


// Function to capitalize first letter of every element in array (for Spotify)
function uppercase(str) {
  var array1 = str.split(' ');
  var newarray1 = [];

  for(var x = 0; x < array1.length; x++){
      newarray1.push(array1[x].charAt(0).toUpperCase()+array1[x].slice(1));
  }
  return newarray1.join(' ');
}

// Start Spotify functions ---------------------------

// Spotify function for user defined song
function spotifyDefinedSong() {

  var spotify = new Spotify({
    id: '5c9e4058b9344f12b1a898462e0f0bd5',
    secret: 'a2f3387a2d284228a6ec1ee35318d0da'
  });

  spotify.search({ type: 'track', query: formattedInput }, function(err, data) {
    if (!err) {
      var formattedSongName = formattedInput.split('+').join(' ');
      // console.log(JSON.stringify(data, null, 4));
      console.log("------------------------------------------")
      console.log('Artist: ' + data.tracks.items[0].artists[0].name);
      console.log('Song name: ' + uppercase(formattedSongName));
      console.log('Preview link: ' + data.tracks.items[0].preview_url);
      console.log('Album: ' + data.tracks.items[0].album.name);
      console.log("------------------------------------------")
    } else {
      console.log('Error occurred: ' + err);
    }
  });
}

// Default Spotify song function
function spotifyDefaultSong() {

  var spotify = new Spotify({
    id: '5c9e4058b9344f12b1a898462e0f0bd5',
    secret: 'a2f3387a2d284228a6ec1ee35318d0da'
  });

  spotify
  .request('https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE')
  .then(function(data) {
    // console.log(data);
    console.log("------------------------------------------")
    console.log('Artist: ' + data.album.artists[0].name);
    console.log('Song name: ' + data.name);
    console.log('Preview link: ' + data.preview_url);
    console.log('Album: ' + data.album.name);
    console.log("------------------------------------------")
  })
  .catch(function(err) {
    console.error('Error occurred: ' + err);
  });
}
// End Spotify functions --------------------------

// Movie functions --------------------------------
function movieThis() {

  var movieQueryUrl = "http://www.omdbapi.com/?apikey=trilogy&type=movie&plot=short&t=" + formattedInput;

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
}

function defaultMovie() {
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

// End Movie functions ----------------------------

// Twitter command
if (command == 'my-tweets') {
  myTweets();
}

// Spotify command
  else if (command == 'spotify-this-song') {

    var input = process.argv;

    if (input.length > 3) {
      for (var i = 3; i < input.length; i++) {
        if (i > 3 && i < input.length) {
          formattedInput = formattedInput + '+' + (input[i]);
        } else {
          formattedInput += input[i];
        }
      }
      spotifyDefinedSong();
    } else {
        spotifyDefaultSong();
    }
  }

// Movie command
    else if (command == 'movie-this') {

      var input = process.argv;

      if (input.length > 3) {
        for (var i = 3; i < input.length; i++) {
          if (i > 3 && i < input.length) {
            formattedInput = formattedInput + '+' + (input[i]);
          } else {
            formattedInput += input[i];
          }
        }
        movieThis();
      } else {
          defaultMovie();
        }
    }

// Do what it says command
      else if (command == 'do-what-it-says') {
        // console.log('do-what-it-says');
        fs.readFile("random.txt", "utf8", function(error, data) {
          if (error) {
            return console.log(error);
          } else {
              // console.log(data);
              var dataArr = data.split(",");
              // console.log(dataArr);

              // Spotify commands ------------------------
              if (dataArr[0] == 'spotify-this-song') {


                var input = dataArr[1].split(' ');

                for (var i = 0; i < input.length; i++) {
                  if (i > 0 && i < input.length) {
                    formattedInput = formattedInput + '+' + (input[i]);
                  } else {
                    formattedInput += input[i];
                  }
                }
                console.log("formattedInput: " + formattedInput);
                spotifyDefinedSong();
              }
                // Twitter commands
                else if (dataArr[0] == 'my-tweets') {
                  myTweets();
                }
                  // Movie commands
                  else if (dataArr[0] == 'movie-this') {
                    movieThis();
                  }
            }
        });
      }
        else {
          console.log("Please enter one of the following commands:");
          console.log("   'my-tweets'");
          console.log("   'spotify-this-song <enter song title>'");
          console.log("   'movie-this <enter movie title>'");
          console.log("   'do-what-it-says'");
        }
