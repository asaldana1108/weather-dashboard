var cityformEl = document.querySelector("#city-form");
var citynameEl = document.querySelector("#city-name");
var cityEl = document.querySelector("#city");
var temperatureEl = document.querySelector("#todays-temperature");
var humidityEl = document.querySelector("#humidity");
var windspeedEl = document.querySelector("#wind-speed");
var uvIndexEl = document.querySelector("#uv-index");
var cardsContainerEl = document.querySelector("#cards-container");
var citybuttonEl = document.querySelector("#citybutton");

var cityArr = [];


var formSubmitHandler = function(event) {
    event.preventDefault();

    cardsContainerEl.textContent = "";

    var cityname = citynameEl.value.trim();
    if(cityname) {
        getCurrentWeather(cityname);
        get5dayForecast(cityname);
        var buttonEL = document.createElement("button");
        buttonEL.className = "btn border bg-light w-100 p-2";
        buttonEL.textContent = cityname;
        citybuttonEl.appendChild(buttonEL);
        // if(cityArr.indexOf(cityname) == -1) {
        //     cityArr.push(cityname); 
        //     localStorage.setItem("citynames", JSON.stringify(names));
        // }
        citynameEl.value = "";
    } else {
        alert("Please enter a City");
    }
};

var getCurrentWeather = function(city) {
    var apiURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=628c529cd5b47376e9d91b17583d2db0";

    fetch(apiURL)
    .then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                displayWeather(data);
            });
        } else {
            alert("Error: " + response.statusText);
        }
    })
};

var displayWeather = function(data) {
    console.log(data);
    var cityName = data.name; 
    var date = moment().format("MM/DD/YYYY");
    var iconURL = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
    var iconEl = document.createElement("img");
    iconEl.setAttribute("src", iconURL);

    cityEl.textContent = cityName + " (" + date + ")";
    cityEl.appendChild(iconEl);

    var cityTemp = data.main.temp;
    temperatureEl.textContent = "Temperature: " + cityTemp + "°F";

    var cityHum = data.main.humidity;
    humidityEl.textContent = "Humidity: " + cityHum + "%";

    var cityWind = data.wind.speed;
    windspeedEl.textContent = "Wind Speed: " + cityWind + " MPH";

    var cityLon = data.coord.lon;
    var cityLat = data.coord.lat; 

    // var uvIndexURL = "http://api.openweathermap.org/data/2.5/uvi/forecast?" + city + "&units=imperial&appid=628c529cd5b47376e9d91b17583d2db0";

};

var get5dayForecast = function(city) {
    var api5dayURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=628c529cd5b47376e9d91b17583d2db0";

    fetch(api5dayURL)
    .then(function(response) {
        if(response.ok) {
            return response.json().then(function(data) {
                for (var i=0; i < data.list.length; i++) {
                    if(data.list[i].dt_txt.indexOf("12:00:00") !== -1) {
                        var temp = data.list[i].main.temp;
                        var humd = data.list[i].main.humidity;
                        var imglink = "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png";

                        var cardGroup = document.createElement("div");
                        cardGroup.className = "card-group";
                        var cardDiv = document.createElement("div");
                        cardDiv.className = "card bg-primary text-white";
                        var cardDate = document.createElement("h5");
                        var cardIcon = document.createElement("img");
                        var cardTemp = document.createElement("p");
                        var cardHumd = document.createElement("p");

                        cardDate.textContent = moment(data.list[i].dt_txt).format("MM/DD/YYYY"); 
                        cardIcon.setAttribute("src", imglink);
                        cardTemp.textContent = "Temp: " + temp + " °F";
                        cardHumd.textContent = "Humidity: " + humd + "%";

                        cardDiv.appendChild(cardDate);
                        cardDiv.appendChild(cardIcon);
                        cardDiv.appendChild(cardTemp);
                        cardDiv.appendChild(cardHumd);

                        cardGroup.appendChild(cardDiv);
                        cardsContainerEl.appendChild(cardGroup);
                    } 
                }
            });
        } else {
            alert("Error: " + response.statusText);
        }
    })
};



cityformEl.addEventListener("submit", formSubmitHandler);