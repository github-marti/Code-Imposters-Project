function getSpecificDrink(drink) {
    let queryURL = `https://www.thecocktaildb.com/api/json/v2/9973533/search.php?s=${drink}`;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);

        $('#start-container').empty();

        // create container
        let container = $('<div>')
        container.addClass('option-container');

        if (response.drinks !== null) {
            // create title
            let nameTitle = $('<h1>').text("Looking for this?");
            nameTitle.addClass('main-title');
            container.append(nameTitle);

            // create drink option boxes
            let div = $("<div>");
            div.attr('class', 'drink-box light-bg');
            let drink = response.drinks[0].strDrink
            let title = $("<h2>").text(drink);
            let pic = $("<img>");
            pic.attr('src', response.drinks[0].strDrinkThumb);
            pic.addClass('option-pic');
            div.append(title, pic);
            container.append(div);
            $('body').append(container);

            // give drink option an event listener to bring user to final page
            $('.drink-box').on('click', function() {
                resultsPage(drink);
            });

        } else {

            // append a message saying that there were no drinks found
            let div = $('<div>');
            div.addClass('drink-box light-bg');
            let h3 = $('<h3>').text('Oh no!');
            let p = $('<p>').text("We couldn't find a drink with those ingredients.");
            div.append(h3, p);

        }

        // add button to bring them back to index.html if they want to try again
        let returnButton = $('<button>');
        returnButton.addClass('return-button');
        returnButton.text('Try Again');
        container.append(returnButton);

        // give button an event listener that brings it back to main page
        returnButton.on('click', function() {
            location.href="index.html";
        });
    })
}

$('#pick-submit').on('click', function(event) {
    event.preventDefault();
    let drink = $('#textarea1').val();
    console.log(drink);
    getSpecificDrink(drink)
})