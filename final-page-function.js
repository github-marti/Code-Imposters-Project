'use strict'

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

function resultsPage(drink) {
    let queryURL = `https://www.thecocktaildb.com/api/json/v2/9973533/search.php?s=${drink}`;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);

        $('h1').text("Here's your drink!");
        $('.return-button').remove();
        $('.drink-box').remove();

        let finalDrink = $('<div>');
        finalDrink.attr('class', 'results-bg');

        $('.option-container').append(finalDrink);

        let drinkName = response.drinks['0'].strDrink;
        console.log(drinkName);
        let title = $("<h1>").text(drinkName);
        let pic = $("<img>");
        pic.attr('src', response.drinks['0'].strDrinkThumb);
        pic.addClass('option-pic');
        let recipeDiv = $('<div>');
        let ingredientsTitle = $('<h5>').text('Ingredients')
        let instructionDiv = $("<div>");
        let instructionP = $("<p>");
        let glassP = $("<p>");
        let drink = response.drinks;
        instructionP.text("Instruction: " + drink[0].strInstructions);
        glassP.text("Glass: " + drink[0].strGlass);
        instructionDiv.append(instructionP, glassP);
        recipeDiv.append(ingredientsTitle);

        finalDrink.append(title, pic, recipeDiv, instructionDiv);
      

        let drink = "";

        for (let i = 1; i < 16; i++) {
            if (response.drinks['0'][`strIngredient${i}`] !== null) {
                let ingredient = response.drinks['0'][`strIngredient${i}`]
                console.log('currently on', ingredient)
                let ingredientP = $('<p>').text(i+': ' + ingredient);
                recipeDiv.append(ingredientP);
                if (drinkObject.hasOwnProperty(ingredient)) {
                    drink = ingredient;
                }
            }
        }

        getMusic(drink)


    })
}