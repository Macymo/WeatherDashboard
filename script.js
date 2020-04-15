$(document).ready(function(){

    $("#currentCity").hide();
    //current city forecast API Call
    function currentCityForecast(city){
        var apiKey = "818e5b0e3e17697364971c8cea59f2dd"
        //var city = ""
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

         $.ajax({
             url: queryURL,
             method: "GET"
         }).then(function(response){
             console.log(response);
                $("#currentCityName").text(response.name);
                $("#currentCityTemp").text(response.main.temp);
                $("#currentCityHumid").text(response.main.humidity);
                $("#currentCityWind").text(response.wind.speed);
               
                //$("#mainCard").append(cityName, cityTemp, cityHumid, cityWind);
                $("#currentCity").show();

                var lat = response.coord.lat
                var lon = response.coord.lon
                queryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon; 
                $.ajax({
                  url: queryURL,
                  method: "GET"
                }).then(function(response){
                    $("#currentCityUV").text(response.value);
                })
         });
    };
    

    // //5 day forecast API call
    // // function fiveDayForecast(city){
    // //     var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=818e5b0e3e17697364971c8cea59f2dd";
    
    // //     $.ajax({
    // //         url: queryURL,
    // //         method: "GET"
    // //     }).then(function(response){
    // //         var cityName = $("<h5>").text(response.name);
    // //         var cityTemp = $("<p>").text("Temp: " + response.main.temp);
    // //         var cityHumid = $("<p>").text("Humidity: " + response.sys[1].name)
    // //         console.log(response);
    //         $(".card-body").append(cityName, cityTemp, cityHumid);
    //     });
    // };
    // fiveDayForecast();





//     init();

     //Clear input element and render a new li for each city
    function renderCities(){
        $("#cityList").empty();
        for (var i = 0; i < cities.length; i++) {
            var city = cities[i];
            createCityLists(city);
        };
    };
        function createCityLists(city){
            console.log("inCityList");
            var cityLi = $("<li>").text(city)
            console.log(cityLi);
            $("#cityList").append(cityLi); 
        };
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
    // renderStoredInputs();


    var cities = []
    //Click event to save user input in local storage
    $("#searchBtn").click(function(){
        var cityInputs = $(this).siblings("#userInput").val().trim();
        $("#userInput").val("");
        console.log(cityInputs);
        if (cityInputs !== ""){
            
            cities.push(cityInputs);
            
            localStorage.setItem("searches",JSON.stringify(cities));
            createCityLists(cityInputs);
            currentCityForecast(cityInputs);
        };
    });
        

});


