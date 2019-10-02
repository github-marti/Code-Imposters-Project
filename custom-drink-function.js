// let queryURL = ""
// let ingredients = 'gin,lime'

$('#ingredient-submit').on('click', function() {
    // prevents page from refreshing
    event.preventDefault();

    // create ingredients array
    let ingredientsArray = [];

    console.log($('#liquor-choice').val())

    // push the alcohol value into the ingredientsArray
    ingredientsArray.push($('#liquor-choice').val());

    // only take ingredients that are checked in input form
    $("body input:checkbox:checked").map(function(){
        ingredientsArray.push($(this).val());
    });

    // convert ingredientsArray into string with items separated by commas
    ingredients = ingredientsArray.join();
    console.log(ingredients);

    // call function
    getCustomDrink(ingredients);
})

function getCustomDrink (ingredients) {
    let queryURL = `https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=${ingredients}`

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        
        $('#start-container').remove();

        // create container
        let container = $('<div>');
        container.addClass('option-container');
        $('body').append(container);

        if (response.drinks !== "None Found") {

            // create title
            let mainTitle = $('<h1>').text('Select Your Drink:');
            container.append(mainTitle);

            for (let i = 0; i < 3; i++) {
                let div = $("<div>");
                div.addClass('drink-box light-bg');
                if (response.drinks[i]) {
                    drinkName = response.drinks[i].strDrink;
                    div.attr('drink-name', drinkName)
                    let title = $("<h2>").text(drinkName);
                    let pic = $("<img>");
                    pic.attr('src', response.drinks[i].strDrinkThumb);
                    pic.addClass('option-pic');
                    div.append(title, pic);
                    container.append(div);

                    console.log(drinkName);
                };
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

            // give button an event listener that brings user back to main page
            returnButton.on('click', function() {
                location.href="index.html";
            });
        
        // else if it returns no drinks
        } else {

            // append a message saying that there were no drinks found
            let div = $('<div>');
            div.addClass('drink-box light-bg');
            let h3 = $('<h3>').text('Oh no!');
            let p = $('<p>').text("We couldn't find a drink with those ingredients.");

            // and append a button asking user to try again
            let returnButton = $('<button>');
            returnButton.addClass('return-button');
            returnButton.text('Try Again');
            div.append(h3, p, returnButton);
            container.append(div);

            // give button an event listener that brings user back to main page
            returnButton.on('click', function() {
                location.href="index.html";
            });
        }
    })
};

    