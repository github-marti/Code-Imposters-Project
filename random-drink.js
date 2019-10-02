function randomDrinks(){
    
    let queryURL =  "https://www.thecocktaildb.com/api/json/v2/9973533/random.php";
    
    
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
            // div.attr("src", "https://vinepair.com/articles/50-most-popular-cocktails-world-2017/");
            p.text(drinkName);
            img.attr("src", drink[0].strDrinkThumb);
            // img.attr("class","drink-option");
            div.attr("data-name", drinkName);
            div.addClass("drink-option")
            // div.attr("class", "image");
            div.append(p, img);
            $("body").append(div);
        
            
    
            })          
        
        }
    }

            
    $("body").on("click", '.drink-option', function(event){
        event.preventDefault();
        alert("click");
        let drinkName = $(this).attr("data-name");
        let drinkDetailURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drinkName;

            $.ajax({
                url: drinkDetailURL,
                method: "GET"
            }).then(function(response){
                console.log(response);
            })
            let div = $("<div>");
            let img = $("<img>");
            let p = $("<p>");
            let drink = response.drinks;
            img.attr("src", drink[0].strDrinkThumb);
            div.addClass("drink-option");
            p.text(drink[0].strInstructions);
            div.append(p, img);
            $("body").append(div);


        })

    $("#search").on("click",function(event){  
        event.preventDefault();
        randomDrinks();
        
})

// div.addClass("drink-option");