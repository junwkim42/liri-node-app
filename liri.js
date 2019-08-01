require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var spotify = keys.spotify;
var fs = require("fs");

console.log(spotify);

if(!process.argv[2] || (!process.argv[3] && process.argv[2] != 'do-what-it-says')){ 
    console.log(`Usage: node liri concert-this <artist/band name here>`);
    console.log(`                 spotify-this-song <song name here>`);
    console.log(`                 movie-this <movie name here>`);
    console.log(`                 do-what-it-says`);
    return ;}

var order = process.argv[2].toLowerCase();
var searchSubject = process.argv.slice(3).join('+');
var URL;
if (order == "concert-this"){
    URL = "https://rest.bandsintown.com/artists/" + searchSubject + "/events?app_id=codingbootcamp";
    console.log(`Searching for ${searchSubject}'s concert...`)
    axios.get(URL).then(function(response){
        console.log(response);
    });
}
else if (order == "spotify-this-song"){
    //spotify : 1. request auth token through POST with client and secret (POST)
    //          2. send token to api requeset
    // https://developer.spotify.com/documentation/general/guides/authorization-guide/
    URL = "https://api.spotify.com/v1/search?q=" + searchSubject + "&type=track";
   /* axios({
        method: 'get',
        url: URL,
        headers: {
            'Authorization': `Bearer` + keys.spotify,
        }
    }).then(function(response){
        console.log(response);
    });

    var Spotify = require( 'node-spotify-api' );
var spotify = new Spotify( keys.spotify );
spotify
       .search({ type: 'track', query: UserInput })
       .then( function( response ) {}
    */
   axios.get(URL).then(function(response){
    console.log(response);
});
}
else if (order == "movie-this"){
    URL = "http://www.omdbapi.com/?t=" + searchSubject + "&apikey=trilogy";
    console.log(`Searching for ${searchSubject}'s information...`)
    axios.get(URL).then(function(response){
        console.log(response);
    });
}
else if (order == "do-what-it-says"){
    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
      
        // We will then print the contents of data
        console.log(data);
      
        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");
      
        // We will then re-display the content as an array for later use.
        console.log(dataArr);
      
      });
}
else{
    console.log("unknown command. Aborting");
    return ;
}



console.log(searchSubject);