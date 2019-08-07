# liri-node-app

Command-Line bot for searching concert info, songs, movie info and reading commands from .txt file!

Usage: node liri concert-this <artist/band name here> || 
                 spotify-this-song <song name here> ||
                 movie-this <movie name here> ||
                 do-what-it-says 

* concert-this: search for artist's/band's concert schedule by sending request to Bands In Town api through axios module.

* spotify-this-song: search for information on the song through Spotify api with node-spotify-api. If no song name given, 
                  search for "The sign"
                  
* movie-this: search for information about the movie through OMDB api. If no movie title given, search for "Mr. Nobody"

* do-what-it-says: Runs the command and input written in random.txt file. File name has to be random.txt and should be in the same
                 location with liri.js. 
                 
### Prerequisites
```
npm install
```
package.json will (and should) install following modules:
- moment
- fs
- axios
- node-spotify-api
- dotenv

### Installation
Once modules are installed, create a file named .env 
```
touch .env
```
this file should contain your spotify api ID and SECRET for spotify-this-song command to work.
Open .env file with editor and add the following
```
SPOTIFY_ID=YOUR_SPOTIFY_ID
SPOTIFY_SECRET=YOUR_SPOTIFY_SECRET
```
If you don't have these yet, you can get them by signing up for spotify web development api and creating an app. (https://developer.spotify.com/documentation/web-api/)

### Tests
![testimg](https://i.imgur.com/CKJBn16.gif)
### Author
Scott Kim
