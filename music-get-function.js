'use strict'
let drink = "Beer";

function getMusic(drink) {
    let drinkObject = {
        "Beer": "84",
        "Rum": "144",
    };

    let genre = drinkObject[drink];
    console.log(genre);

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

    $.ajax(settings).done(function (response) {
        console.log(response);

        let randomArtist = Math.floor(Math.random() * response.data.length + 1);
        let artist = response.data[randomArtist].name;
        console.log (artist);

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

        $.ajax(settings).done(function (response) {
            let randomSong = Math.floor(Math.random() * response.data.length + 1);
            let songInfo = response.data[randomSong]
            let smallImage = songInfo.artist.picture;
            let songAudio = songInfo.preview;

            let artistName = $('<p>').text(songInfo.artist.name);
            let artistPic = $('<img>').attr('src', smallImage);
            let songPreview = $('<audio>').
            $('body').append(artistName, artistPic)


            console.log(response);
        });
        

    });

}

getMusic(drink);