'use strict'

function getMusic(drink) {
    let drinkObject = {
        "random": 0,
        "gin": 116,
        "rum": [122, 144],
        "vodka": 113,
        "beer": [152, 84],
        "tequila": [65, 113, 132],
        "wine": [165, 129, 98],
        "whiskey": [464, 152, 153],
        "sake": 16,
        "brandy": 129
    }

    let random = Math.floor(Math.random() * drinkObject[drink].length);
    let genre = drinkObject[drink][random];
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
        console.log(randomArtist);
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
            // get information from ajax object
            let randomSong = Math.floor(Math.random() * response.data.length + 1);
            let songInfo = response.data[randomSong]
            let smallImage = songInfo.artist.picture;
            let songAudio = songInfo.preview;

            // append information into the DOM
            let songBox = $('<div>');
            songBox.addClass('song-box');
            let mainTitle = $('<h2>').text('Your Song:');
            let artistName = $('<h3>').text(songInfo.artist.name);
            let artistPic = $('<img>').attr('src', smallImage);
            let songPreview = $('<audio>');
            songPreview.attr('controls', true);
            songPreview.attr('style', 'display:block;');
            songPreview.html(`<source src=${songAudio}>`);
            songBox.append(mainTitle, artistName, artistPic, songPreview);
            $('.option-container').append(songBox);


            console.log(response);
        });
        

    });

}