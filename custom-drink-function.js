let queryURL = ""
let ingredients = 'gin,lime'

$('#custom-submit').on('click', function() {
    // prevents page from refreshing
    event.preventDefault;

    // create ingredients array
    let ingredientsArray = [];

    // push the alcohol value into the ingredientsArray
    ingredientsArray.push($('#alcohol-choice').val());

    // only take ingredients that are checked in input form
    if ($("input[type='checkbox']").is(":checked")) {
        ingredientsArray.push($('#checkbox_ID').val());
    }

    // convert ingredientsArray into string with items separated by commas
    ingredients = ingredientsArray.join();

    // call function
    getCustomDrink(ingredients);
})

function getCustomDrink (ingredients) {
    queryURL = `https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=${ingredients}`

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);

        // create container
        let container = $('<div>');
        container.addClass('option-container');
        $('body').append(container);

        // create title
        let mainTitle = $('<h1>').text('Select Your Drink:');
        container.append(mainTitle);

        for (let i = 0; i < 3; i++) {
            let div = $("<div>");
            div.addClass('drink-box light-bg');
            drinkName = response.drinks[i].strDrink;
            div.attr('drink-name', drinkName)
            let title = $("<h1>").text(drinkName);
            let pic = $("<img>");
            pic.attr('src', response.drinks[i].strDrinkThumb);
            pic.addClass('option-pic');
            div.append(title, pic);
            container.append(div);

            console.log(drinkName);
        }

        // give drink option an event listener to bring user to final page
        $('.drink-box').on('click', function() {
            resultsPage($(this).attr('drink-name'));
        });

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
};

getCustomDrink(ingredients);

    