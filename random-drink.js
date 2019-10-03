$("#random-submit").on("click",function(e){
    console.log('click');
    e.preventDefault();
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
            div.addClass('drink-box light-bg');
            let p = $("<p>");
            let img = $("<img>");
            let drink = response.drinks;
            let drinkName = drink[0].strDrink;
            p.text(drinkName);
            p.attr("style", "color: white");
            img.attr("src", drink[0].strDrinkThumb);
            img.addClass("option-pic");       
            div.attr("data-name", drinkName);
            // div.addClass("drink-option")
            div.append(p, img);
            container.append(div);
        
            
    
            })          
        
        }
    }

            
$("body").on("click", '.drink-box', function(event){
    
    event.preventDefault();
    let drink = $(this).attr("data-name");
    resultsPage(drink);
    
})
        
