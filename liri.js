require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

// Include the axios npm package (Don't forget to run "npm install axios" in this folder first!)
var axios = require("axios");

// Load the NPM Package inquirer
var inquirer = require("inquirer");


var category = process.argv[2];
var choice = process.argv[3];

if (category === `concert-this`) {

}

if (category === `spotify-this-song`) {


    spotify.search({ type: 'track', query: choice, limit: 1 })
    .then(function(response) {
      console.log(JSON.stringify(response));
    })
    .catch(function(err) {
      console.log(err);
    });


    // I'm only getting the stringified version of the JSON object. When i try accessing it without the JSON.stringify(), it wont show me how to access the object. 
    // If i were able to access it, i would go through each key to find the artist, song name, preview link, and album its from. 
    // Then console log all of them in a pretty way

    // console.log("Artist name: response.artist")
    // console.log("Song name: response.songname")
    // and so forth
}

if (category === `movie-this`) {

    // Then run a request with axios to the OMDB API with the movie specified
    axios.get("http://www.omdbapi.com/?t=" + choice + "&y=&plot=short&apikey=trilogy").then(
        function(response) {
            console.log(response.data);
        })
        .catch(function(error) {
            if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("---------------Data---------------");
            console.log(error.response.data);
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
            } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an object that comes back with details pertaining to the error that occurred.
            console.log(error.request);
            } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
            }
            console.log(error.config);
        });

}

if (category === `do-what-it-says`) {

}
