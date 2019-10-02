'use strict'

function resultsPage(drink) {
    let queryURL = `https://www.thecocktaildb.com/api/json/v2/9973533/search.php?s=${drink}`;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);

        $('.main-title').text("Here's your drink!");
        $('.return-button').remove();
        $('.drink-box').remove();

        let finalDrink = $('<div>');
        finalDrink.attr('class', 'drink-box results-bg');

        $('.option-container').append(finalDrink);

        let drinkName = response.drinks['0'].strDrink;
        console.log(drinkName);
        let title = $("<h1>").text(drinkName);
        let pic = $("<img>");
        pic.attr('src', response.drinks['0'].strDrinkThumb);
        pic.addClass('option-pic');
        let recipeDiv = $('<div>');
        finalDrink.append(title, pic, recipeDiv);


        for (let i = 1; i < 16; i++) {
            if (response.drinks['0'][`strIngredient${i}`] !== null) {
                console.log('currently on', response.drinks['0'][`strIngredient${i}`])
                let ingredientP = $('<p>').text(i+': ' + response.drinks['0'][`strIngredient${i}`]);
                recipeDiv.append(ingredientP);
            }
        }


    })
}