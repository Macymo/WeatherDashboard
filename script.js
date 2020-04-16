$(document).ready(function(){

    var cities = [];

    $("#currentCity").hide();
    $("#fiveDay").hide();
    //current city forecast API Call
    function currentCityForecast(city){
        var apiKey = "818e5b0e3e17697364971c8cea59f2dd";
        //var city = ""
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

         $.ajax({
             url: queryURL,
             method: "GET"
         }).then(function(response){
            
                var weatherIcon = response.weather[0].icon;
                var date = $("<h2>").text(moment().format('l'));
                var icon = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"); 
                //convert temp to fahrenheit
                var tempF = (response.main.temp - 273.15) * 1.80 + 32;

                $("#currentCityName").text(response.name);
                $("#currentCityName").append(date);
                $("#currentCityName").append(icon);
                $("#currentCityTemp").text(tempF.toFixed(2) + " \u00B0F");
                $("#currentCityHumid").text(response.main.humidity + "%");
                $("#currentCityWind").text(response.wind.speed + "MPH");

                var lat = response.coord.lat
                var lon = response.coord.lon
                queryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon; 
                $.ajax({
                  url: queryURL,
                  method: "GET"
                }).then(function(response){
                    $("#currentCityUV").text(response.value);
                });

                $("#currentCity").show();
         });
    };
    
    //5 day forecast API call
    // function fiveDayForecast(city){
    //     var apiKey = "818e5b0e3e17697364971c8cea59f2dd"
    //     var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;
    
    //     $.ajax({
    //         url: queryURL,
    //         method: "GET"
    //     }).then(function(response){
    //         console.log(queryURL);
    //         console.log(response);
    // //         $("<h5>").text(response.name);
    // //         $("<p>").text("Temp: " + response.main.temp);
    // //         $("<p>").text("Humidity: " + response.sys[1].name)
    // //         
    //     });
    // };
    // fiveDayForecast();

    //Clear input element and render a new li for each city
    function renderCities(){
        $("#cityList").empty();
        for (var i = 0; i < cities.length; i++) {
            var city = cities[i];
            createCityLists(city);
        };
    };

    function createCityLists(city){
        //console.log("inCityList");
        var cityLi = $("<li>").text(city)
        //console.log(cityLi);
        $("#cityList").append(cityLi); 
    };

    //Click event to save user input in local storage
    $("#searchBtn").click(function(){
        var cityInputs = $(this).siblings("#userInput").val().trim();
        $("#userInput").val("");
        //console.log(cityInputs);
        if (cityInputs !== ""){
            
            cities.push(cityInputs);
            
            localStorage.setItem("searches",JSON.stringify(cities));
            createCityLists(cityInputs);
            currentCityForecast(cityInputs);
        };
    });
        
});

    //$(document).on("click", "<li>", currentCityForecast());

//     function init() {
//         // Get stored cities from localStorage
//         var storedCities = $("#userInput").each(function(){
//             var inputId = $(this).attr("id");
//             $(this).val(localStorage.getItem(inputId));
    
//         // If cities were retrieved from localStorage, update the cities array to it
//         if (storedCities !== null) {
//         cities = storedCities;
//         };
    
//         renderCities();
//         });
//     };

// });

    // function renderStoredInputs(){
    //     $("#userInput").each(function(){
    //         var inputId = $(this).attr("id");
    //         $(this).val(localStorage.getItem(inputId));
    //     });
    // };
