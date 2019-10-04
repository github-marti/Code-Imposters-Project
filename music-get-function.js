'use strict'

// initialize the drink option!
let drinkObject = {
    "random": 0,
    "gin": 116,
    "rum": [122, 144],
    "vodka": 113,
    "beer": [152, 84],
    "tequila": [65, 113, 132],
    "red wine": [165, 129, 98],
    "whiskey": [464, 152, 153],
    "sake": 16,
    "brandy": 129,
    "champagne": 132,
    "cognac": [165, 116],
    "lager": [152, 84],

}

// function that will get the song based on the drink ingredient passed into it
function getMusic(drink) {

    // initialize the genre variable
    let genre = '';

    // if the selected drink key has a value that's an array
    if (Array.isArray(drinkObject[drink])) {

        // create a random number between 0 and the length of the array minus one
        let random = Math.floor(Math.random() * drinkObject[drink].length);

        // console log everything so you can see where you went wrong when something inevitably gets screwed up!
        console.log('drink is',drink);
        console.log('object length is',drinkObject[drink].length);
        console.log('random is',random)

        // make the genre a randomly chosen item within the array
        genre = drinkObject[drink][random];
        console.log('genre is',genre);

    // otherwise, if the selected drink has a string key value
    } else {

        // just make the genre whatever that single value is
        genre = drinkObject[drink];
        console.log('genre is',genre)
    }

    // initialize settings needed for the first AJAX call that will search for artists within the selected genre
    let settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://deezerdevs-deezer.p.rapidapi.com/genre/${genre}/artists`,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
            "x-rapidapi-key": "7c559106demsh3b5d953d593cadap18d2cajsn4da17557f40c"
        }
    }

    // AJAX GET method
    $.ajax(settings).then(function (response) {
        console.log(response);

        // create a random integer between 1 and the length of the data array in the response
        let randomArtist = Math.floor(Math.random() * response.data.length + 1);
        console.log(randomArtist);

        // initialize a variable that will show the name of the randomly selected artist
        let artist = response.data[randomArtist].name;
        console.log (artist);

        // initialize settings needed for second AJAX call which will search for songs based on the specific artist
        let settings = {
            "async": true,
            "crossDomain": true,
            "url": `https://deezerdevs-deezer.p.rapidapi.com/search?q=${artist}`,
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
                "x-rapidapi-key": "7c559106demsh3b5d953d593cadap18d2cajsn4da17557f40c"
            }
        }

        $.ajax(settings).then(function (response) {

            console.log(response);

            // create a random integer between 1 and the length of the data array in response
            let randomSong = Math.floor(Math.random() * response.data.length + 1);

            // get information from response that will be printed on page
            let songInfo = response.data[randomSong]
            let smallImage = songInfo.artist.picture;
            let songAudio = songInfo.preview;

            // append information into the DOM
            let songBox = $('<div>');
            songBox.addClass('song-box');
            let mainTitle = $('<h2>').text('Your Song:');
            let artistName = $('<h4>').text('by ' + songInfo.artist.name);
            let songName = $('<h4>').text(songInfo.title);
            let artistPic = $('<img>').attr('src', smallImage);
            let songPreview = $('<audio>');
            let spotifyLink = $('<a>').text('Check out this artist on Spotify');
            spotifyLink.attr('href', `https://open.spotify.com/search/${songInfo.artist.name}`)
            songPreview.attr('controls', true);
            songPreview.attr('style', 'display:block;');
            songPreview.html(`<source src=${songAudio}>`);
            songBox.append(mainTitle, songName, artistName, artistPic, songPreview, spotifyLink);
            $('.option-container').append(songBox);

        });
        

    });

}