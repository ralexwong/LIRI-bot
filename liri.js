require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

// Include the axios npm package (Don't forget to run "npm install axios" in this folder first!)
var axios = require("axios");

// Load the NPM Package inquirer
var inquirer = require("inquirer");

// fs is a core Node package for reading and writing files
var fs = require("fs");

// request npm package
var request = require("request");

var moment = require("moment");


var category = process.argv[2];
var choice = "";

switch (category) {
    case "concert-this":
        whichCategory(); 
        findConcert(choice); 
        break;

    case "spotify-this-song":
        whichCategory();
        findSpotify(choice); 
        break;

    case "movie-this":
        whichCategory();
        findMovie(choice);
        break;

    case "do-what-it-says": 
        doWhatItSays(choice);
        break;

    default:
        console.log("Only commands are 'concert-this', 'spotify-this-song', 'movie-this' and 'do-what-it-says");
}

function whichCategory() {

    for (var i = 3; i < process.argv.length; i++) {
        if (i > 3 && i < process.argv.length) {
            choice = choice + " " + process.argv[i];
            console.log(choice);
        } else {
            choice += process.argv[i];
            console.log(choice);
        }
    }

    // bands in town api
    if (category === "concert-this" && process.argv.length <= 3) {
        queryURL = "https://rest.bandsintown.com/artists/artists/events?app_id=codingbootcamp";
    } 
    else 
    {
        queryURL = "https://rest.bandsintown.com/artists/" + choice + "/events?app_id=codingbootcamp";

    }

    // spotofy api
    if (category === "spotify-this-song" && process.argv.length <= 3) {
        choice = "The+Sign+Ace+of+Base"
    }

    // ombd api
    if (category === "movie-this" && process.argv.length <= 3) {
        choice = "mr nobody"
        queryUrl = "http://www.omdbapi.com/?t=" + choice + "&y=&plot=short&apikey=trilogy"
    } 
    else {
        queryUrl = "http://www.omdbapi.com/?t=" + choice + "&y=&plot=short&apikey=trilogy";
    }
}

function findConcert() {

    // issue API request
    request (queryURL, function (error, response, body) {
        var concert = JSON.parse(body);

        for (var i=0; i < concert.length; i++) {
            console.log("Venue: " + concert[i].venue.name);

            console.log("Location: " + concert[i].venue.city + ", " + concert[i].venue.region);
        }

        // use momentJS to format concert date
        var date = concertData[i].datetime;
        date = moment(date).format("MM/DD/YYYY");
        console.log("Date: " + date);
            
    });

}

function findSpotify() {


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

function findMovie(choice) {

    // Then run a request with axios to the OMDB API with the movie specified
    axios.get("http://www.omdbapi.com/?t=" + choice + "&y=&plot=short&apikey=trilogy").then(
        function(response) {
            console.log("Title: " + response.data.Title)
            console.log("Year: " + response.data.Year);
            console.log("Rated: " + response.data.Rated);
            console.log("Ratings: " + response.data.Ratings[1].Value);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
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

function doWhatItSays() {

    // The code will store the contents of the reading inside the variable "data"
    fs.readFile("random.txt", "utf8", function(error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }

    // Then split it by commas (to make it more readable)
    var dataArr = data.split(",");

    var userChoice = dataArr[1];

    findMovie(userChoice)

    // cannot get this part to work
    // end up with backstreet boys as my JSON

    });

}
