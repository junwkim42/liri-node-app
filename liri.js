require("dotenv").config();
var moment = require('moment');
var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require( 'node-spotify-api' );
var spotify = new Spotify( keys.spotify );
var fs = require("fs");


if(!process.argv[2] || (!process.argv[3] && process.argv[2] != 'do-what-it-says')){ 
    console.log(`Usage: node liri concert-this <artist/band name here>`);
    console.log(`                 spotify-this-song <song name here>`);
    console.log(`                 movie-this <movie name here>`);
    console.log(`                 do-what-it-says`);
    return ;}

var order = process.argv[2].toLowerCase();
var searchSubject = process.argv.slice(3).join('+');
var searchKey = process.argv.slice(3).join(' ');
var URL;

function liribot(){
    if (order == "concert-this"){
        URL = "https://rest.bandsintown.com/artists/" + searchSubject + "/events?app_id=codingbootcamp";
        console.log(`Searching for ${searchKey}'s concert...`);
        axios.get(URL).then(function(response){
            for(var i = 0; i < response.data.length; i++){
                console.log(response.data[i].venue.name);
                console.log(response.data[i].venue.country + ", " + response.data[i].venue.city);
                console.log(moment(response.data[i].datetime.slice(0,10)).format("MM/DD/YYYY"));
                console.log("Time: " + response.data[i].datetime.slice(11) + '\n');
            }        
        });
    }
    else if (order == "spotify-this-song"){
        console.log(`Searching for ${searchKey}`);
        /* Artist(s)
        The song's name
        A preview link of the song from Spotify
        The album that the song is from */
        spotify
            .search({ type: 'track', query: searchSubject })
            .then( function( response ) {
                console.log("ARTIST: " + response.tracks.items[0].artists[0].name);
                console.log("TITLE: " + response.tracks.items[0].name);
                console.log("LINK: " + response.tracks.items[0].external_urls.spotify);
                console.log("ALBUM: " + response.tracks.items[0].album.name);
           
            });
    }
    else if (order == "movie-this"){
        /* Title of the movie.
        * Year the movie came out.
        * IMDB Rating of the movie.
        * Rotten Tomatoes Rating of the movie.
        * Country where the movie was produced.
        * Language of the movie.
        * Plot of the movie.
        * Actors in the movie. */

        URL = "http://www.omdbapi.com/?t=" + searchSubject + "&apikey=trilogy";
        console.log(`Searching for ${searchKey}'s information...`);
        axios.get(URL).then(function(response){
            console.log("Title: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("IMDB: " + response.data.imdbRating);
            console.log("Rotten Tomato: " + response.data.Ratings[1].Value);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        });
    }
    else if (order == "do-what-it-says"){
        fs.readFile("random.txt", "utf8", function(error, data) {
        // If the code experiences any errors it will log the error to the console.
            if (error) {
                return console.log(error);
            }     
        // We will then print the contents of data
        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");
      
        order = dataArr[0];
        searchKey = dataArr[1];
        searchSubject = dataArr[1].split(' ').join('+');
        if (order == "do-what-it-says"){
            console.log("Possible infinite recursion. Aborting...");
            return ;
        }
        if (dataArr[1][0] == `"`){
            searchKey = searchKey.slice(1,-1);
            searchSubject = searchSubject.slice(1,-1);
        }    

        liribot();
      });
    }
    else{
        console.log("unknown command. Aborting");
        return ;
    }
}

liribot();

