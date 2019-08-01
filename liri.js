require("dotenv").config();
var keys = require("./keys.js");
var spotify = keys.spotify;

console.log(spotify);

if(!process.argv[2] || !process.argv[3]){ 
    console.log(`Usage: node liri concert-this <artist/band name here>`);
    console.log(`                 spotify-this-song <song name here>`);
    console.log(`                 movie-this <movie name here>`);
    console.log(`                 do-what-it-says`);
    return ;}

var order = process.argv[2].toLowerCase();
var searchSubject = process.argv.slice(3).join(' ');
var URL;
if (order == "concert-this"){
    URL = "https://rest.bandsintown.com/artists/" + searchSubject + "/events?app_id=codingbootcamp";
    console.log("Searching for TV Show");
}
else if (order == "spotify-this-song"){
    console.log("Searching for TV Actor/Actress");
}
else if (order == "movie-this"){
    console.log("unknown command. Aborting");
}
else if (order == "do-what-it-says"){

}
else{
    console.log("unknown command. Aborting");
    return ;
}



console.log(searchSubject);