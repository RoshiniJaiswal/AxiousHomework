require("dotenv").config();
var keys = require("./keys")
var request = require("request")
var Spotify = require("node-spotify-api")

var fs = require("fs")

//Artist API for an artist and render information
var concertThis = function(artist) {
    var region = ""
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist.replace(" ", "+") + "/events?app_id=codingbootcamp"
        //console.log(queryUrl);

    request(queryUrl, function(err, response, body) {
        // If the request is successful
        if (!err && response.statusCode === 200) {
            // Save parsed body in a new variable for easier use
            var concertInfo = JSON.parse(body)

            outputData(artist + " concert information:")

            for (i = 0; i < concertInfo.length; i++) {

                region = concertInfo[i].venue.region
                    //handle Canadian venues
                if (region === "") {
                    region = concertInfo[i].venue.country
                }

                // Need to return Name of venue, Venue location, Date of event (MM/DD/YYYY)
                outputData("Venue: " + concertInfo[i].venue.name)
                outputData("Location: " + concertInfo[i].venue.city + ", " + region);
                outputData("Date: " + dateFormat(concertInfo[i].datetime, "mm/dd/yyyy"))
            }
        }
    })
}




// This will take a movie, search IMDb and return information
var movieThis = function(movie) {
    // Default should be "Mr. Nobody"
    if (!movie) {
        movie = "Mr.+Nobody"
    }
}