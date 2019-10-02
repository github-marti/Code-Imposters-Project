function randomDrinks(){
    
    let queryURL =  "https://www.thecocktaildb.com/api/json/v2/9973533/random.php";
    
    
    for(let i = 0; i < 3; i++){
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response);
        let div = $("<div>");
        let p = $("<p>");
        let img = $("<img>");
        let drink = response.drinks;
        let drinkName = drink[0].strDrink;
        // div.attr("src", "https://vinepair.com/articles/50-most-popular-cocktails-world-2017/");
        p.text(drinkName);
        img.attr("src", drink[0].strDrinkThumb);
        img.attr("class","drink-option");
        div.attr("data-name", drinkName);
        // div.attr("class", "image");
        div.append(p, img);
        $("body").append(div);

        
        $("div").on("click", function(event){
        event.preventDefault();
        let drinkName = $(this).data("name");
        })
           
       
    })
    }
}
    $("#search").on("click",function(event){  
        event.preventDefault();
        randomDrinks();
        
})

// div.addClass("drink-option");