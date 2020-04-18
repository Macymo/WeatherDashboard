$(document).ready(function(){

    var cities = [];

    $("#currentCity").hide();
    $("#fiveDay").hide();
    //current city forecast API Call
    function currentCityForecast(city){
        var apiKey = "818e5b0e3e17697364971c8cea59f2dd";
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
                        $("#currentCityUV").each(function(){
                            var uvIndex = response.value;
                            if (uvIndex <= 2.9){
                                $(this).addClass("low");
                            } else if (uvIndex = 3 || uvIndex <= 7.9){
                                $(this).addClass("moderateToHigh");
                            } else {
                                $(this).addClass("veryHigh");
                            };

                        $("#currentCityUV").text(response.value);
                        console.log(resonse.value);
                        });
                });   

                $("#currentCity").show();
                 
        }); 
    };
        
    //5 day forecast API call
    function fiveDayForecast(city){
        var apiKey = "818e5b0e3e17697364971c8cea59f2dd"
        var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;
    
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            for(var i=0; i <= 5; i++){
                //var date = response.list[i].dt;
                //var newDay = newDate(parseInt(date.subtr(6)));
                //console.log(newDay);
                var date = moment(response.list[i].dt * 1000).format("l");
                var weatherIcon = response.list[i].weather[0].icon;
                //convert temp to fahrenheit
                var tempF = (response.list[i].main.temp - 273.15) * 1.80 + 32;
                    
                $("#date" + i).text(date);
                $("#icon" + i).attr("src", "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png");
                $("#temp" + i).text(tempF.toFixed(2) + " \u00B0F");
                $("#humid" + i).text(response.list[i].main.humidity + "%"); 

            };
            $("#fiveDay").show();   
        });
    };

    //Clear input element and render a new li for each city
    function renderCities(){
        //console.log(cities);
        $("#cityList").empty();
        for (var i = 0; i < cities.length; i++) { 
            createCityLists(cities[i]);
        };
    };

    function createCityLists(city){
        //console.log("inCityList");
        var cityLi = $("<li>").text(city)
        //console.log(cityLi);
        cityLi.addClass("cityList");
        $("#cityList").append(cityLi); 
    };

    //Click event to save user input in local storage
    $("#searchBtn").click(function(){
        var cityInputs = $(this).siblings("#userInput").val().trim();
        $("#userInput").val("");
        //console.log(cityInputs);
        if (cityInputs !== ""){
            if (cities.indexOf(cityInputs)== -1){
                cities.push(cityInputs);
                localStorage.setItem("searches",JSON.stringify(cities));
                createCityLists(cityInputs);
            };
            
            weather(cityInputs);
        };
    });

    function weather(city){
        currentCityForecast(city);
        fiveDayForecast(city);
    };

    function init() {
        // Get stored cities from localStorage
        var storedCities = JSON.parse(localStorage.getItem("searches"));
    
        // If cities were retrieved from localStorage, update the cities array to it
        if (storedCities) {
            cities = storedCities;
            renderCities();
            weather(cities[cities.length -1]);
        };
        
    };
    init();

    $("#cityList").on("click", ".cityList", function(){
        var cityOnButton = $(this).text();
        weather(cityOnButton);
    });
});
