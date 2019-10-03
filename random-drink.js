$("#random-submit").on("click",function(){
    randomDrinks();
})
function randomDrinks(){
    $("#start-container").remove();
    let queryURL =  "https://www.thecocktaildb.com/api/json/v2/9973533/random.php";
    
    let container = $("<div>");
    container.attr("id", "random-container");
    container.addClass("option-container");
    $("body").append(container);
    
    for(let i = 0; i < 3; i++){
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){

            // console.log(response);
            let div = $("<div>");
            let p = $("<p>");
            let img = $("<img>");
            let drink = response.drinks;
            let drinkName = drink[0].strDrink;
            p.text(drinkName);
            p.attr("style", "color: white");
            img.attr("src", drink[0].strDrinkThumb);
            img.addClass("option-pic");       
            div.attr("data-name", drinkName);
            div.addClass("drink-option")
            div.append(p, img);
            container.append(div);
        
            
    
            })          
        
        }
    }

            
    $("body").on("click", '.drink-option', function(event){
        event.preventDefault();
        $("#random-container").remove();
        let container = $("<div>");
        container.addClass("option-container");
         $("body").append(container);
    
        
        let drinkName = $(this).attr("data-name");
        let drinkDetailURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drinkName;

            $.ajax({
                url: drinkDetailURL,
                method: "GET"
            }).then(function(response){
                console.log(response);
            
            let div = $("<div>");
            let img = $("<img>");
            let title = $("<h1>").text(drinkName);
            let p = $("<p>");
            let glassP = $("<p>");
            let recipeDiv = $("<div>");
            title.attr("style", "color: white");
            p.attr("style", "color: white");
            recipeDiv.attr("style", "color: white");
            glassP.attr("style", "color: white");
            let drink = response.drinks;
            img.attr("src", drink[0].strDrinkThumb);
            glassP.text("Glass: " +drink[0].strGlass);
            img.addClass("option-pic");
            div.addClass("drink-option");
            p.text("Recipe: " + drink[0].strInstructions);
            div.append(title, img, recipeDiv, p, glassP);
            

            for (let i = 1; i < 16; i++) {
                if (response.drinks[0][`strIngredient${i}`] !== null) {
                    console.log('currently on', response.drinks['0'][`strIngredient${i}`])
                    let ingredientP = $('<p>').text(i+': ' + response.drinks['0'][`strIngredient${i}`]);
                    recipeDiv.append(ingredientP);
                }
            }
            container.append(div);

        })
        })

    $("#search").on("click",function(event){  
        event.preventDefault();
        randomDrinks();
        
})

// div.addClass("drink-option");