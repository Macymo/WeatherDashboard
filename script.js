$(document).ready(function(){
    //current city forecast API Call
    function currentCityForecast(){
        var apiKey = "818e5b0e3e17697364971c8cea59f2dd"
        var city = "Atlanta"
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=818e5b0e3e17697364971c8cea59f2dd";

         $.ajax({
             url: queryURL,
             method: "GET"
         }).then(function(response){
                var cityName = $("<h5>").text(response.name);
                var cityTemp = $("<p>").text("Temperature: " + response.main.temp);
                var cityHumid = $("<p>").text("Humidity: " + response.sys[1].name);
                var cityWind = $("<p>").text("Wind Speed: " + response.wind.speed);
             console.log(response);
         });
    };
    // currentCityForecast();

    //5 day forecast API call
    // function fiveDayForecast(city){
    //     var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=818e5b0e3e17697364971c8cea59f2dd";
    
    //     $.ajax({
    //         url: queryURL,
    //         method: "GET"
    //     }).then(function(response){
    //         var cityName = $("<h5>").text(response.name);
    //         var cityTemp = $("<p>").text("Temp: " + response.main.temp);
    //         var cityHumid = $("<p>").text("Humidity: " + response.sys[1].name)
    //         console.log(response);
    //         $("#card-body").append(cityName, cityTemp, cityHumid);
    //     });
    // };
    // fiveDayForecast();

//     var cities = []

//     init();

//     //Clear input element and render a new li for each city
//     function renderCities(){
//         $("#cityList").html("");
//         for (var i = 0; i < cities.length; i++) {
//             var city = cities[i];

//             var cityLi = $("<li>").text(cities)
//             console.log(cityLi);
//             $("<li>").text(city);
//             $("<li>").attr("data-index",i);

//             $("cityList").append(cityLi);
//         };
//     };

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

    function renderStoredInputs(){
        $("#userInput").each(function(){
            var inputId = $(this).attr("id");
            $(this).val(localStorage.getItem(inputId));
        });
    };
    renderStoredInputs();



    //Click event to save user input in local storage
    $("#searchBtn").click(function(){
        var cityInputs = $(this).siblings("#userInput").val();
        console.log(cityInputs);
        var inputsLocation = $(this).siblings("#userInput");
        console.log(inputsLocation);
        localStorage.setItem(inputsLocation,cityInputs);
        });
        

});


