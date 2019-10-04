'use strict'

// function that puts drink and song information on page
function resultsPage(drink) {

    // initialize a base URL that will search for the specific drink information
    let queryURL = `https://www.thecocktaildb.com/api/json/v2/9973533/search.php?s=${drink}`;
    console.log(queryURL)
    console.log(drink);

    // AJAX GET method
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);

        // remove the elements that were called by previous functions
        $('h1').remove();
        $('.return-button').remove();
        $('.drink-box').remove();

        // create and append elements that will display drink information
        let finalDrink = $('<div>');
        let drinkName = response.drinks['0'].strDrink;
        console.log(drinkName);
        let title = $("<h2>").text(drinkName);
        let pic = $("<img>");
        let recipeDiv = $('<div>');
        let ingredientsTitle = $('<h5>').text('Ingredients');
        let instructionsTitle = $('<h5>').text('Instructions');
        let instructionDiv = $("<div>");
        let instructionP = $("<p>");
        let glassP = $("<p>");
        let drink = response.drinks;
        finalDrink.attr('class', 'results-bg');
        $('.option-container').append(finalDrink);
        pic.attr('src', response.drinks['0'].strDrinkThumb);
        pic.addClass('option-pic');
        instructionP.text(drink[0].strInstructions);
        glassP.text("Glass: " + drink[0].strGlass);
        instructionDiv.append(instructionsTitle, instructionP, glassP);
        recipeDiv.append(ingredientsTitle);
        finalDrink.append(title, pic, recipeDiv, instructionDiv);
      
        // initialize the drink that will be passed onto the music function as "random" in case no matching ingredients are found
        let musicDrink = "random";

        // go through the response data and print all of the ingredients
        for (let i = 1; i < 16; i++) {
            if (response.drinks['0'][`strIngredient${i}`] !== null) {
                let ingredient = response.drinks['0'][`strIngredient${i}`]
                console.log('currently on', ingredient)
                let ingredientP = $('<p>').text(i+': ' + ingredient);
                recipeDiv.append(ingredientP);

                // make the last ingredient that matches the key sin our drinkObject the drink that will be passed onto the music function
                if (drinkObject.hasOwnProperty(ingredient.toLowerCase())) {
                    musicDrink = ingredient.toLowerCase();
                }
            }
        }

        // just checking whether the for loop returned a drink
        console.log("music genre will be based on", musicDrink);

        // call the get music function
        getMusic(musicDrink)

    })
}